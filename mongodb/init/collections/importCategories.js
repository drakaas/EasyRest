db = db.getSiblingDB('mydatabase');
const categoriesData = cat('/docker-entrypoint-initdb.d/collections/productCategories.json');
const categories = JSON.parse(categoriesData);
db.productCategories.insertMany(categories);