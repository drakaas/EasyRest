const { getAllProducts, getProductCategory } = require("../dao/product-dao");
const mongoose = require('mongoose');
const Product = require('../models/product-model');
const Category = require('../models/category-model');

const ProductByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.query;
    if (!categoryId) {
      return res.status(400).json({ message: 'Category ID is required' });
    }
    
    const products = await Product.find({ categoryId });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const ProductByCategorySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Find the category by slug
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Get products in that category
    const products = await Product.find({ categoryId: category._id });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category slug:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching all categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new product
const AddProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    // Validate required fields
    if (!productData.name || !productData.price || !productData.categoryId) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }
    
    // Create new product
    const newProduct = new Product(productData);
    await newProduct.save();
    
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a product
const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    
    // Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product
const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    
    // Find and delete the product
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  ProductByCategoryId,
  ProductByCategorySlug,
  GetAllCategories,
  GetAllProducts,
  AddProduct,
  UpdateProduct,
  DeleteProduct
};