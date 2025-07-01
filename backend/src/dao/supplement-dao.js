const Supplement = require('../models/Supplement');

async function getAllSupplements() {
  try {
    const supplements = await Supplement.find();
    return supplements;
  } catch (error) {
    return { message: error.message };
  }
}

async function getSupplementsByType(type) {
  try {
    const supplements = await Supplement.find({ type });
    return supplements;
  } catch (error) {
    return { message: error.message };
  }
}

module.exports = {
  getAllSupplements,
  getSupplementsByType,
}; 