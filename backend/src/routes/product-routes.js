const express = require('express');
const {    GetAllProducts,GetAllCategories, ProductByCategoryId,ProductByCategorySlug,AddCategory,DeleteCategory, GetAllSupplements, GetSupplementsByType}=require("../services/product-services")
const router = express.Router();

router.get('/getCategoryId',ProductByCategoryId );
router.post('/addCategory',AddCategory);
router.get('/getCategorySlug/:slug',ProductByCategorySlug);

router.get('/categories',GetAllCategories)
router.get('/allProducts',GetAllProducts);
router.delete('/deleteCategory/:slug',DeleteCategory);

// Supplements routes
router.get('/supplements', GetAllSupplements);
router.get('/supplements/type/:type', GetSupplementsByType);

module.exports = router;
