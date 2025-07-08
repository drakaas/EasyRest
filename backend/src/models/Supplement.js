const mongoose = require('mongoose');

const supplementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  price: {
    type: Number,
    default: null,
    min: [0, 'Price cannot be negative'],
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    // enum: ['supplement', 'boisson', 'accompagnement', 'extra'],
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on update
supplementSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Virtual for formatted price
supplementSchema.virtual('formattedPrice').get(function() {
  if (this.price === null || this.price === undefined) return null;
  return parseFloat(this.price.toString()).toFixed(2);
});

// Enable virtuals in toJSON output
supplementSchema.set('toJSON', { virtuals: true });
supplementSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('supplements', supplementSchema); 