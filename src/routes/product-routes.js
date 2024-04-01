import { Router } from 'express'
import {
	createProduct,
	deleteProductById,
	getAllProducts,
	getProductById,
	updateProductById,
} from '../controllers/product-controller.js'
import { verifyJWT } from '../middlewares/auth-middleware.js'
const productRouter = Router()

productRouter.get('/', getAllProducts)

productRouter.get('/:id', getProductById)

productRouter.post('/', verifyJWT, createProduct)

productRouter.put('/:id', verifyJWT, updateProductById)

productRouter.delete('/:id', verifyJWT, deleteProductById)

export default productRouter
