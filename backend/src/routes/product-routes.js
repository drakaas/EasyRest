const express = require('express');
const {    GetAllCategories, ProductByCategoryId,ProductByCategorySlug}=require("../services/product-services")
const router = express.Router();

router.get('/getCategoryId',ProductByCategoryId );

router.get('/getCategorySlug/:slug',ProductByCategorySlug);

router.get('/categories',GetAllCategories)


module.exports = router;
