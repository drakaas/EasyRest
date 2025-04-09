import os
import json
from bson import ObjectId
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "mern-ecommerce")
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

client = MongoClient(MONGO_URL)
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

        # --- Import products ---
        prod_file = os.path.join(DATA_DIR, "products.json")
        if os.path.exists(prod_file):
            with open(prod_file, "r") as f:
                products = json.load(f)
                count = 0
                for prod in products:
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
