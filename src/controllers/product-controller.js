import { Product } from '../models/product-model.js'

// Create a new product
export const createProduct = async (req, res) => {
	try {
		const { name, price, description } = req.body
		const product = new Product({ name, price, description })
		await product.save()
		res.status(201).json(product)
	} catch (error) {
		res.status(500).json({ error: 'Failed to create product' })
	}
}

// Get all products
export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find()
		res.json(products)
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch products' })
	}
}

// Get a single product by ID
export const getProductById = async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findById(id)
		if (!product) {
			return res.status(404).json({ error: 'Product not found' })
		}
		res.json(product)
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch product' })
	}
}

// Update a product by ID
export const updateProductById = async (req, res) => {
	try {
		const { id } = req.params
		const { name, price, description } = req.body
		const product = await Product.findByIdAndUpdate(
			id,
			{ name, price, description },
			{ new: true },
		)
		if (!product) {
			return res.status(404).json({ error: 'Product not found' })
		}
		res.json(product)
	} catch (error) {
		res.status(500).json({ error: 'Failed to update product' })
	}
}

// Delete a product by ID
export const deleteProductById = async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findByIdAndDelete(id)
		if (!product) {
			return res.status(404).json({ error: 'Product not found' })
		}
		res.json({ message: 'Product deleted successfully' })
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete product' })
	}
}
