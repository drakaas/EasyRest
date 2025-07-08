const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required'],
    min: [0, 'Stock cannot be negative']
  },
  category: {
    type: String,
    ref: 'productCategories',
    required: [true, 'Product category is required']
  },
  images: [{
    type: String,
    required: [true, 'At least one image is required']
  }],
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  supplements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'supplements',
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
productSchema.virtual('categoryDetails', {
  ref: 'productCategories',
  localField: 'category',
  foreignField: '_id',
  justOne: true
});

// Enable virtuals in toJSON output
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });
// Update timestamp on update
productSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function() {
  return parseFloat(this.price.toString()).toFixed(2);
});

module.exports = mongoose.model('products', productSchema);