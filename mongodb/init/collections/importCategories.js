const fs = require('fs');
const categoriesData = fs.readFileSync('/docker-entrypoint-initdb.d/collections/productCategories.json', 'utf8');
const categories = JSON.parse(categoriesData);
db.productCategories.insertMany(categories);