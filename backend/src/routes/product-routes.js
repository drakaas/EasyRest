const express = require('express');
const {    GetAllProducts,GetAllCategories, ProductByCategoryId,ProductByCategorySlug}=require("../services/product-services")
const router = express.Router();

router.get('/getCategoryId',ProductByCategoryId );

router.get('/getCategorySlug/:slug',ProductByCategorySlug);

router.get('/categories',GetAllCategories)
router.get('/allProducts',GetAllProducts);


module.exports = router;
