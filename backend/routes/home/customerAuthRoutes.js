const router = require('express').Router()
const customerAuthController = require('../../controllers/home/customerAuthController')

router.post('/customer/customer-register', customerAuthController.customer_register)
router.post('/customer/customer-login', customerAuthController.customer_login)
router.get('/customer/logout', customerAuthController.customer_logout)

router.post('/customer/add-info', customerAuthController.profile_info_add)
router.post('/customer/profile-image-upload', customerAuthController.profile_image_upload)

router.get('/customer/get-profile-data/:id', customerAuthController.get_profile_data)
router.put('/customer/change-password', customerAuthController.changePassword)

module.exports = router