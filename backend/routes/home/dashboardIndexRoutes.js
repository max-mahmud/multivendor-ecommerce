const router = require('express').Router()
const dashboardIndexController = require('../../controllers/home/dashboardIndexController')

router.get('/home/customer/get-dashboard-data/:userId', dashboardIndexController.get_customer_databorad_data)


module.exports = router