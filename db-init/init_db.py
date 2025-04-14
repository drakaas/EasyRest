import time
import json
import os
from pymongo import MongoClient

# Connection parameters
MONGODB_URI = "mongodb://admin:secret@mongodb:27017/mydatabase?authSource=admin"
DB_NAME = "mydatabase"
DATA_DIR = "/app/collections"  # Directory containing JSON files
import os
import json
from bson import ObjectId
from pymongo import MongoClient
from datetime import datetime



client = MongoClient(MONGODB_URI)
db = client[DB_NAME]

def parse_date(value):
    if isinstance(value, str):
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    return value

def import_data(db):
    """Import data from JSON files without duplicate key errors"""
    try:
        # --- Import users ---
        user_file = os.path.join(DATA_DIR, "users.json")
        if os.path.exists(user_file):
            with open(user_file, "r") as f:
                users = json.load(f)
                count = 0
                for user in users:
                    if "_id" in user:
                        user["_id"] = ObjectId(user["_id"])
                    if "createdAt" in user:
                        user["createdAt"] = parse_date(user["createdAt"])
                    if "updatedAt" in user:
                        user["updatedAt"] = parse_date(user["updatedAt"])
                    if "p" in user:
                        del user["p"]

                    result = db.users.update_one(
                        {"email": user["email"]},
                        {"$setOnInsert": user},
                        upsert=True
                    )
                    if result.upserted_id:
                        count += 1
                print(f"Imported {count} new users")

        # --- Import product categories ---
        cat_file = os.path.join(DATA_DIR, "productCategories.json")
        if os.path.exists(cat_file):
            with open(cat_file, "r") as f:
                categories = json.load(f)
                count = 0
                for cat in categories:
                    result = db.productCategories.update_one(
                        {"slug": cat["slug"]},
                        {"$setOnInsert": cat},
                        upsert=True
                    )
                    if result.upserted_id:
                        count += 1
                print(f"Imported {count} new product categories")

        prod_file = os.path.join(DATA_DIR, "products.json")
        if os.path.exists(prod_file):
            with open(prod_file, "r") as f:
                products = json.load(f)
                count = 0
                print(products)
                for prod in products:
                    # Cast string ID fields to ObjectId
                    if "_id" in prod:
                        prod["_id"] = ObjectId(prod["_id"])
                    if "category" in prod:
                        prod["category"] = prod["category"]
                    if "createdAt" in prod:
                        prod["createdAt"] = parse_date(prod["createdAt"])
                    if "updatedAt" in prod:
                        prod["updatedAt"] = parse_date(prod["updatedAt"])
                    
                    result = db.products.update_one(
                        {"name": prod["name"]},
                        {"$setOnInsert": prod},
                        upsert=True
                    )
                    if result.upserted_id:
                        count += 1
                print(f"Imported {count} new products")
        print("✅ Data import completed successfully!")

    except Exception as e:
        print(f"❌ Error importing data: {e}")

if __name__ == "__main__":
    import_data(db)
