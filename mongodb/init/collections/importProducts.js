const fs = require('fs');
const productsData = fs.readFileSync('/docker-entrypoint-initdb.d/collections/products.json', 'utf8');
const products = JSON.parse(productsData);
db.products.insertMany(products);