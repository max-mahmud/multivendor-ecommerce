const router = require('express').Router()
const orderController = require('../../controllers/order/orderController')

// ---- customer
router.post('/home/order/palce-order', orderController.place_order)
router.post('/order/create-payment', orderController.create_payment)



module.exports = router