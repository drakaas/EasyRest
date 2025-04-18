// Orders collection schema
const orderSchema = {
  user: ObjectId,  // Reference to the user who placed the order
  items: [
    {
      product: ObjectId,  // Reference to product
      quantity: Number,
      price: Decimal128  // Storing the price at time of purchase
    }
  ],
  total: Decimal128,
  status: String,  // 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  paymentMethod: String,
  createdAt: Date,
  updatedAt: Date
}
