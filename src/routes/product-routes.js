import { Router } from 'express'
import {
	createProduct,
	deleteProductById,
	getAllProducts,
	getProductById,
	updateProductById,
} from '../controllers/product-controller.js'
const productRouter = Router()

productRouter.get('/', getAllProducts)

productRouter.get('/:id', getProductById)

productRouter.post('/', createProduct)

productRouter.put('/:id', updateProductById)

productRouter.delete('/:id', deleteProductById)

export default productRouter
