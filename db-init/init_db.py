import time
import json
import os
from pymongo import MongoClient

# Connection parameters
MONGODB_URI = "mongodb://admin:secret@mongodb:27017/mydatabase?authSource=admin"
DB_NAME = "mydatabase"
DATA_DIR = "/app/collections"  # Directory containing JSON files

def wait_for_mongodb():
    """Wait until MongoDB is available"""
    max_attempts = 30
    attempt = 0
    
    while attempt < max_attempts:
        try:
            client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
            client.admin.command('ping')
            print("MongoDB connection successful!")
            return client
        except Exception as e:
            attempt += 1
            print(f"Attempt {attempt}/{max_attempts}: MongoDB not available yet. Retrying in 2 seconds...")
            print(f"Error: {e}")
            time.sleep(2)
    
    raise Exception("Could not connect to MongoDB after multiple attempts")

def setup_schema(db):
    """Set up collections with validation schemas"""
    # Create users collection
    db.create_collection("users", validator={
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["username", "email", "createdAt"],
            "properties": {
                "username": {"bsonType": "string"},
                "email": {"bsonType": "string", "pattern": "^.+@.+\\..+$"},
                "password": {"bsonType": "string"},
                "role": {"enum": ["user", "admin"]},
                "createdAt": {"bsonType": "date"},
                "updatedAt": {"bsonType": "date"}
            }
        }
    })
    
    # Create product categories collection
    db.create_collection("productCategories", validator={
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["name", "slug"],
            "properties": {
                "name": {"bsonType": "string"},
                "slug": {"bsonType": "string"},
                "description": {"bsonType": "string"}
            }
        }
    })
    
    # Create products collection
    db.create_collection("products", validator={
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["name", "price", "category"],
            "properties": {
                "name": {"bsonType": "string"},
                "description": {"bsonType": "string"},
                "price": {"bsonType": "decimal"},
                "stock": {"bsonType": "int", "minimum": 0},
                "category": {"bsonType": "objectId"},
                "images": {
                    "bsonType": "array",
                    "items": {"bsonType": "string"}
                },
                "createdAt": {"bsonType": "date"},
                "updatedAt": {"bsonType": "date"}
            }
        }
    })
    
    # Create orders collection
    db.create_collection("orders", validator={
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["user", "items", "total", "status"],
            "properties": {
                "user": {"bsonType": "objectId"},
                "items": {
                    "bsonType": "array",
                    "items": {
                        "bsonType": "object",
                        "required": ["product", "quantity"],
                        "properties": {
                            "product": {"bsonType": "objectId"},
                            "quantity": {"bsonType": "int", "minimum": 1},
                            "price": {"bsonType": "decimal"}
                        }
                    }
                },
                "total": {"bsonType": "decimal"},
                "status": {
                    "enum": ["pending", "processing", "shipped", "delivered", "cancelled"]
                },
                "shippingAddress": {"bsonType": "object"},
                "paymentMethod": {"bsonType": "string"},
                "createdAt": {"bsonType": "date"},
                "updatedAt": {"bsonType": "date"}
            }
        }
    })
    
    # Create indexes
    db.users.create_index("email", unique=True)
    db.productCategories.create_index("slug", unique=True)
    db.products.create_index([("name", "text"), ("description", "text")])
    db.products.create_index("category")
    db.orders.create_index("user")
    db.orders.create_index("status")
    
    print("Schema setup completed successfully!")
from bson import ObjectId
from datetime import datetime

def parse_date(value):
    if isinstance(value, str):
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    return value

def import_data(db):
    """Import data from JSON files"""
    try:
        # --- Import users ---
        user_file = os.path.join(DATA_DIR, "users.json")
        if os.path.exists(user_file):
            with open(user_file, "r") as f:
                users = json.load(f)
                for user in users:
                    if "_id" in user:
                        user["_id"] = ObjectId(user["_id"])
                    if "createdAt" in user:
                        user["createdAt"] = parse_date(user["createdAt"])
                    if "updatedAt" in user:
                        user["updatedAt"] = parse_date(user["updatedAt"])
                    if "p" in user:
                        del user["p"]  # remove plaintext password if present
                if users:
                    db.users.insert_many(users)
                    print(f"Imported {len(users)} users")

        # --- Import product categories ---
        with open(os.path.join(DATA_DIR, "productCategories.json"), "r") as f:
            categories = json.load(f)
            if categories:
                db.productCategories.insert_many(categories)
                print(f"Imported {len(categories)} product categories")

        # --- Import products ---
        with open(os.path.join(DATA_DIR, "products.json"), "r") as f:
            products = json.load(f)
            if products:
                db.products.insert_many(products)
                print(f"Imported {len(products)} products")

        print("Data import completed successfully!")
    except Exception as e:
        print(f"Error importing data: {e}")

def main():
    print("Starting MongoDB initialization...")
    
    try:
        client = wait_for_mongodb()
        db = client[DB_NAME]
        
        # Check if we need to set up the schema
        if "users" not in db.list_collection_names():
            print("Setting up database schema...")
            setup_schema(db)
        else:
            print("Schema already exists, skipping schema creation")
        
        # Check if we need to import data
        print("test")
        if db.productCategories.count_documents({}) == 0:
            print("Importing initial data...")
            import_data(db)
        else:
            print("Data already exists, skipping data import")
            
        print("MongoDB initialization completed successfully!")
    except Exception as e:
        print(f"ERROR: {e}")
        exit(1)

if __name__ == "__main__":
    main()