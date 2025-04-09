const mongoose = require('mongoose');
const slugify = require('slugify');

const productCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    trim: true
  }
});

// Create slug from name before saving
productCategorySchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('productCategories', productCategorySchema, 'ProductCategories');
