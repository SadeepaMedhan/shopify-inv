const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, image } = req.body;
    const newProduct = new Product({ name, description, price, imageUrl, image });
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, image } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.imageUrl = imageUrl || product.imageUrl;
    product.image = image || product.image; // Update image field if provided
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createProduct,
  updateProduct,
};
