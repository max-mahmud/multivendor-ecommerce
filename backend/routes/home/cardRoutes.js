const router = require('express').Router()
const cardController = require('../../controllers/home/cardController')

router.post('/home/product/add-to-card', cardController.add_to_card)
router.get('/home/product/get-card-product/:userId', cardController.get_card_products)

module.exports = router