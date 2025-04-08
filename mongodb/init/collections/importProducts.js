db = db.getSiblingDB('mydatabase');
const productsData = cat('/docker-entrypoint-initdb.d/collections/products.json');
const products = JSON.parse(productsData);
db.products.insertMany(products);