print("Starting data import...");

// Wait function
function waitForConnection() {
  let connected = false;
  while (!connected) {
    try {
      db.adminCommand('ping');
      connected = true;
      print("MongoDB connection established");
    } catch (err) {
      print("Waiting for MongoDB to be fully available...");
      sleep(2000); // Sleep for 2 seconds
    }
  }
}

// Wait for MongoDB to be ready
waitForConnection();

// Import product categories
print("Importing product categories...");
try {
  const fs = require('fs');
  const categoriesData = fs.readFileSync('/docker-entrypoint-initdb.d/collections/productCategories.json', 'utf8');
  const categories = JSON.parse(categoriesData);
  db.productCategories.insertMany(categories);
  print("Product categories imported successfully");
} catch (e) {
  print("Error importing product categories: " + e);
}

// Import products
print("Importing products...");
try {
  const fs = require('fs');
  const productsData = fs.readFileSync('/docker-entrypoint-initdb.d/collections/products.json', 'utf8');
  const products = JSON.parse(productsData);
  db.products.insertMany(products);
  print("Products imported successfully");
} catch (e) {
  print("Error importing products: " + e);
}

print("Data import complete");