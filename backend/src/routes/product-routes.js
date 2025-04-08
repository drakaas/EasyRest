const express = require('express');
const {     ProductByCategoryId,ProductByCategorySlug}=require("../services/product-services")
const router = express.Router();

router.get('/getCategoryId',ProductByCategoryId );

router.get('/getCategorySlug/:slug',ProductByCategorySlug);



module.exports = router;
