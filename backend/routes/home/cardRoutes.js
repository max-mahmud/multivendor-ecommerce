const router = require('express').Router()
const cardController = require('../../controllers/home/cardController')

// Card products
router.post('/home/product/add-to-card', cardController.add_to_card)
router.get('/home/product/get-card-product/:userId', cardController.get_card_products)
router.delete('/home/product/delete-card-product/:card_id', cardController.delete_card_product)
router.put('/home/product/quantity-inc/:card_id', cardController.quantity_inc)
router.put('/home/product/quantity-dec/:card_id', cardController.quantity_dec)

// Wish list product
router.post('/home/product/add-to-wishlist', cardController.add_wishlist)
router.get('/home/product/get-wishlist-products/:userId', cardController.get_wishlists)
router.delete('/home/product/delete-wishlist-product/:wishlistId', cardController.delete_wishlist)

// Compare product
router.post('/home/product/add-to-compare', cardController.add_compare)
router.get('/home/product/get-compare-products/:userId', cardController.get_compares)
router.delete('/home/product/delete-compare-product/:compareId', cardController.delete_compare)
module.exports = router