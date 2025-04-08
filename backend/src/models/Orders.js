const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Order item must belong to a product']
  },
  quantity: {
    type: Number,
    required: [true, 'Order item must have a quantity'],
    min: [1, 'Quantity must be at least 1']
  },
  price: {
    type: mongoose.Decimal128,
    required: [true, 'Order item must have a price']
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user']
  },
  items: [orderItemSchema],
  total: {
    type: mongoose.Decimal128,
    required: [true, 'Order must have a total amount']
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['credit_card', 'paypal', 'bank_transfer']
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
orderSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Calculate total before saving
orderSchema.pre('save', function(next) {
  this.total = this.items.reduce((sum, item) => {
    return sum + (parseFloat(item.price.toString()) * item.quantity);
  }, 0);
  next();
});

module.exports = mongoose.model('Order', orderSchema);