// productController.js
const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");

const getAllProducts = async () => {
  try {
    const products = await Product.find().populate('category');
    if (!products.length) return { success: false, message: "No products found" };
    return { success: true, data: products };
  } catch (error) {
    return { success: false, message: "Error: " + error.message };
  }
};

const getProductsByCategory = async (categoryId) => {
  try {
    if (!categoryId) return { success: false, message: "No category specified" };
    
    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return { success: false, message: "Invalid category ID format" };
    }

    const products = await Product.find({ category: categoryId })
      .populate('category')
      .sort({ createdAt: -1 });

    if (!products.length) {
      return { success: false, message: "No products found in this category" };
    }

    return { success: true, data: products };
  } catch (error) {
    return { success: false, message: "Error: " + error.message };
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategory
};