const express = require('express');
const {    GetAllProducts,GetAllCategories, ProductByCategoryId,ProductByCategorySlug, AddProduct, UpdateProduct, DeleteProduct } = require("../services/product-services")
const { isLoggedIn, isAdmin } = require('../middlewares/isLoggedIn');
const router = express.Router();

router.get('/getCategoryId',ProductByCategoryId );

router.get('/getCategorySlug/:slug',ProductByCategorySlug);

router.get('/categories',GetAllCategories)
router.get('/allProducts',GetAllProducts);

// Admin routes for product management
router.post('/add', isLoggedIn, isAdmin, AddProduct);
router.put('/update/:id', isLoggedIn, isAdmin, UpdateProduct);
router.delete('/delete/:id', isLoggedIn, isAdmin, DeleteProduct);

module.exports = router;
