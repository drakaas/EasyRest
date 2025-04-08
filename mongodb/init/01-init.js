// mongodb/init/init.js
db = db.getSiblingDB('mydatabase');

// Create users collection
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "email", "createdAt"],
      properties: {
        username: { bsonType: "string" },
        email: { bsonType: "string", pattern: "^.+@.+\\..+$" },
        password: { bsonType: "string" },
        role: { enum: ["user", "admin"], default: "user" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Create product categories collection
db.createCollection('productCategories', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "slug"],
      properties: {
        name: { bsonType: "string" },
        slug: { bsonType: "string" },
        description: { bsonType: "string" }
      }
    }
  }
});

// Create products collection
db.createCollection('products', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "category"],
      properties: {
        name: { bsonType: "string" },
        description: { bsonType: "string" },
        price: { bsonType: "decimal" },
        stock: { bsonType: "int", minimum: 0 },
        category: { bsonType: "objectId" },
        images: { 
          bsonType: "array",
          items: { bsonType: "string" } 
        },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Create orders collection
db.createCollection('orders', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user", "items", "total", "status"],
      properties: {
        user: { bsonType: "objectId" },
        items: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["product", "quantity"],
            properties: {
              product: { bsonType: "objectId" },
              quantity: { bsonType: "int", minimum: 1 },
              price: { bsonType: "decimal" }
            }
          }
        },
        total: { bsonType: "decimal" },
        status: { 
          enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
          default: "pending"
        },
        shippingAddress: { bsonType: "object" },
        paymentMethod: { bsonType: "string" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.productCategories.createIndex({ slug: 1 }, { unique: true });
db.products.createIndex({ name: "text", description: "text" });
db.products.createIndex({ category: 1 });
db.orders.createIndex({ user: 1 });
db.orders.createIndex({ status: 1 });