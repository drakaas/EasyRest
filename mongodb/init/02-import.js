// mongodb/init/02-import.js
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
  load("/docker-entrypoint-initdb.d/collections/importCategories.js");
  print("Product categories imported successfully");
} catch (e) {
  print("Error importing product categories: " + e);
}

// Import products
print("Importing products...");
try {
  load("/docker-entrypoint-initdb.d/collections/importProducts.js");
  print("Products imported successfully");
} catch (e) {
  print("Error importing products: " + e);
}

print("Data import complete");