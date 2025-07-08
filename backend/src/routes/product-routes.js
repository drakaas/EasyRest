const express = require('express');
const {    GetAllProducts,GetAllCategories, ProductByCategoryId,ProductByCategorySlug,AddCategory,DeleteCategory, GetAllSupplements, GetSupplementsByType}=require("../services/product-services")
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');
const Supplement = require('../models/Supplement');

// Multer config for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.get('/getCategoryId',ProductByCategoryId );
router.post('/addCategory',AddCategory);
router.get('/getCategorySlug/:slug',ProductByCategorySlug);

router.get('/categories',GetAllCategories)
router.get('/allProducts',GetAllProducts);
router.delete('/deleteCategory/:slug',DeleteCategory);

// Supplements routes
router.get('/supplements', GetAllSupplements);
router.get('/supplements/type/:type', GetSupplementsByType);

// Route to create a supplement with image upload
router.post('/supplements', upload.single('image'), async (req, res) => {
  try {
    console.log('[POST /supplements] req.body:', req.body);
    console.log('[POST /supplements] req.file:', req.file);
    const Supplement = require('../models/Supplement');
    const { name, description, price, type } = req.body;
    const image = req.file ? `/images/${req.file.filename}` : null;
    if (!image) {
      console.error('[POST /supplements] No image uploaded');
      return res.status(400).json({ error: 'Image is required' });
    }
    const supplement = new Supplement({ name, description, price, type, image });
    await supplement.save();
    res.status(201).json(supplement);
  } catch (err) {
    console.error('[POST /supplements] Error:', err);
    res.status(500).json({ error: 'Failed to create supplement', details: err.message });
  }
});

// Route to update a supplement with optional image upload
router.put('/supplements/:id', upload.single('image'), async (req, res) => {
  try {
    const Supplement = require('../models/Supplement');
    const { id } = req.params;
    const { name, description, price, type } = req.body;
    const supplement = await Supplement.findById(id);
    if (!supplement) return res.status(404).json({ error: 'Supplement not found' });

    let image = supplement.image;
    if (req.file) {
      // Delete old image if it exists and is not the same as the new one
      if (image && image.startsWith('/images/')) {
        const oldImagePath = path.join(__dirname, '../../public', image);
        fs.unlink(oldImagePath, err => {
          if (err) console.warn('[PUT /supplements/:id] Failed to delete old image:', oldImagePath, err.message);
        });
      }
      image = `/images/${req.file.filename}`;
    }

    supplement.name = name;
    supplement.description = description;
    supplement.price = price;
    supplement.type = type;
    supplement.image = image;
    supplement.updatedAt = Date.now();
    await supplement.save();
    res.json(supplement);
  } catch (err) {
    console.error('[PUT /supplements/:id] Error:', err);
    res.status(500).json({ error: 'Failed to update supplement', details: err.message });
  }
});

// Route to get all unique supplement types
router.get('/supplements/types', async (req, res) => {
  try {
    const Supplement = require('../models/Supplement');
    const types = await Supplement.distinct('type');
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch supplement types', details: err.message });
  }
});

// Route to get all supplements by a list of categories/types
router.post('/supplements/by-categories', async (req, res) => {
  try {
    const { categories } = req.body;
    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ error: 'categories must be a non-empty array' });
    }
    const Supplement = require('../models/Supplement');
    const supplements = await Supplement.find({ type: { $in: categories } });
    res.json(supplements);
  } catch (err) {
    console.error('[POST /supplements/by-categories] Error:', err);
    res.status(500).json({ error: 'Failed to fetch supplements by categories', details: err.message });
  }
});

// Helper to get all supplement types
async function getAllSupplementTypes() {
  return await Supplement.distinct('type');
}

// Create product
router.post('/products', upload.array('images'), async (req, res) => {
  try {
    console.log('[POST /products] req.body:', req.body);
    console.log('[POST /products] req.files:', req.files);
    const { name, description, price, stock, category, supplements } = req.body;
    // Validate supplement categories
    let supplementArr = [];
    if (supplements) {
      const supplementTypes = await getAllSupplementTypes();
      const parsedSupplements = typeof supplements === 'string' ? JSON.parse(supplements) : supplements;
      for (const supp of parsedSupplements) {
        if (!supplementTypes.includes(supp.category)) {
          console.error('[POST /products] Invalid supplement category:', supp.category);
          return res.status(400).json({ error: `Invalid supplement category: ${supp.category}` });
        }
        supplementArr.push({ category: supp.category, maxChoices: supp.maxChoices });
      }
    }
    // Handle images
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => `/images/${file.filename}`);
    }
    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      images,
      supplements: supplementArr
    });
    await product.save();
    console.log('[POST /products] Product saved:', product);
    res.status(201).json(product);
  } catch (err) {
    console.error('[POST /products] Error:', err);
    res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
});

// Update product
router.put('/products/:id', upload.array('images'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, supplements } = req.body;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    // Validate supplement categories
    let supplementArr = [];
    if (supplements) {
      const supplementTypes = await getAllSupplementTypes();
      const parsedSupplements = typeof supplements === 'string' ? JSON.parse(supplements) : supplements;
      for (const supp of parsedSupplements) {
        if (!supplementTypes.includes(supp.category)) {
          return res.status(400).json({ error: `Invalid supplement category: ${supp.category}` });
        }
        supplementArr.push({ category: supp.category, maxChoices: supp.maxChoices });
      }
    }
    // Handle images
    let images = product.images;
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => `/images/${file.filename}`);
    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.category = category;
    product.images = images;
    product.supplements = supplementArr;
    product.updatedAt = Date.now();
    await product.save();
    res.json(product);
  } catch (err) {
    console.error('[PUT /products/:id] Error:', err);
    res.status(500).json({ error: 'Failed to update product', details: err.message });
  }
});

module.exports = router;
