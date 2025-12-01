// routes/bookmarkRoutes.js
const express = require("express");
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const productRoute= express.Router();

// GET all products
productRoute.get('/', getProducts)

// GET single product by ID
productRoute.get('/:id', getProductById)

// POST create a product (with Cloudinary image upload)
productRoute.post('/', createProduct)

// PUT update a product (with optional new image);
productRoute.put('/:id', updateProduct)

// DELETE remove a product
productRoute.delete('/:id', deleteProduct)




module.exports = productRoute;
