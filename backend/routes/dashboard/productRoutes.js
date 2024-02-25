const router = require('express').Router()
const { authMiddleware } = require('../../middlewares/authMiddleware')
const productController = require('../../controllers/dashboard/productController')

router.post('/product-add', authMiddleware, productController.add_product)
router.get('/products-get', authMiddleware, productController.products_get)
router.get('/product-get/:productId', authMiddleware, productController.product_get)

router.get('/discount-product-get/:sellerId', authMiddleware, productController.discount_product_get)

router.post('/product-update', authMiddleware, productController.product_update)
router.post('/product-image-update', authMiddleware, productController.product_image_update)

router.delete('/delete-product/:productId', authMiddleware, productController.delete_product)

module.exports = router