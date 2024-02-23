const router = require('express').Router()
const orderController = require('../../controllers/order/orderController')

// ---- customer
router.post('/home/order/palce-order', orderController.place_order)
router.post('/order/create-payment', orderController.create_payment)
router.get('/home/customer/get-orders/:customerId/:status', orderController.get_orders)
router.get('/home/customer/get-order/:orderId', orderController.get_order)

// ---seller
router.get('/seller/orders/:sellerId', orderController.get_seller_orders)
router.get('/seller/order/:orderId', orderController.get_seller_order)
router.put('/seller/order-status/update/:orderId', orderController.seller_order_status_update)

// --- admin
router.get('/admin/orders', orderController.get_admin_orders)
router.get('/admin/order/:orderId', orderController.get_admin_order)
router.put('/admin/order-status/update/:orderId', orderController.admin_order_status_update)

module.exports = router