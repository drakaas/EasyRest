const express = require('express');
const {    GetAllProducts,GetAllCategories, ProductByCategoryId,ProductByCategorySlug,AddCategory,DeleteCategory}=require("../services/product-services")
const router = express.Router();

router.get('/getCategoryId',ProductByCategoryId );
router.post('/addCategory',AddCategory);
router.get('/getCategorySlug/:slug',ProductByCategorySlug);

router.get('/categories',GetAllCategories)
router.get('/allProducts',GetAllProducts);
router.delete('/deleteCategory/:id',DeleteCategory);

module.exports = router;
