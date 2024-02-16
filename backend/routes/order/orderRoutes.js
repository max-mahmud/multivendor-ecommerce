const router = require('express').Router()
const orderController = require('../../controllers/order/orderController')

// ---- customer
router.post('/home/order/palce-order', orderController.place_order)
router.post('/order/create-payment', orderController.create_payment)


// ---seller
router.get('/seller/orders/:sellerId', orderController.get_seller_orders)
router.get('/seller/order/:orderId', orderController.get_seller_order)
router.put('/seller/order-status/update/:orderId', orderController.seller_order_status_update)

module.exports = router