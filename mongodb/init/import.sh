#!/bin/bash

# Wait for MongoDB to be available
until mongosh -u admin -p secret --authenticationDatabase admin --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
  echo "Waiting for MongoDB to start..."
  sleep 2
done

# Import data
echo "Importing productCategories.json..."
mongoimport --username admin --password secret --authenticationDatabase admin \
  --db mydatabase --collection productCategories \
  --file /docker-entrypoint-initdb.d/collections/productCategories.json --jsonArray

echo "Importing products.json..."
mongoimport --username admin --password secret --authenticationDatabase admin \
  --db mydatabase --collection products \
  --file /docker-entrypoint-initdb.d/collections/products.json --jsonArray

echo "Data import completed."
