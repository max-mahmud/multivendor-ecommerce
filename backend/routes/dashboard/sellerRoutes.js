const router = require('express').Router()
const { authMiddleware } = require('../../middlewares/authMiddleware')
const sellerController = require('../../controllers/dashboard/sellerController')

router.get('/request-seller-get',authMiddleware,sellerController.get_seller_request)
router.get('/get-seller/:sellerId',authMiddleware,sellerController.get_seller)
router.post('/seller-status-update',authMiddleware,sellerController.seller_status_update)

router.get('/get-deactive-sellers', authMiddleware, sellerController.get_deactive_sellers)
router.get('/get-active-sellers', authMiddleware, sellerController.get_active_sellers)

module.exports = router