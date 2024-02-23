const cardModel = require('../../models/cardModel')
const wishlistModel = require('../../models/wishlistModel')
const compareModel = require('../../models/compareModel')
const { responseReturn } = require('../../utiles/response')
const { mongo: { ObjectId } } = require('mongoose');

class cardController {
    add_to_card = async (req, res) => {
        const { userId, productId, quantity } = req.body
        try {
            const product = await cardModel.findOne({
                $and: [
                    {
                        productId: {
                            $eq: productId
                        }
                    },
                    {
                        userId: {
                            $eq: userId
                        }
                    }
                ]
            })
            if (product) {
                responseReturn(res, 404, { error: 'Product already added to card' })
            } else {
                const product = await cardModel.create({
                    userId,
                    productId,
                    quantity
                })
                responseReturn(res, 201, { message: 'Add to card success', product })
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    get_card_products = async (req, res) => {
        const commition = 5;
        const { userId } = req.params;
        try {
            const card_products = await cardModel.aggregate([
                {
                    $match: {
                        userId: {
                            $eq: new ObjectId(userId)
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'productId',
                        foreignField: "_id",
                        as: 'products'
                    }
                }
            ]);

            let calculatePrice = 0;
            let card_product_count = 0;
            const outOfStockProduct = card_products.filter(p => p.products[0].stock < p.quantity);
            outOfStockProduct.forEach(p => card_product_count += p.quantity);

            const stockProduct = card_products.filter(p => p.products[0].stock >= p.quantity);
            stockProduct.forEach(p => {
                card_product_count += p.quantity;
                const { quantity, products: [{ price, discount }] } = p;
                calculatePrice += quantity * (discount !== 0 ? (price - Math.floor((price * discount) / 100)) : price);
            });

            const unique = [...new Set(stockProduct.map(p => p.products[0].sellerId.toString()))];
            const p = unique.map((sellerId) => {
                let price = 0;
                const products = [];
                stockProduct.forEach((prod) => {
                    const tempProduct = prod.products[0];
                    if (sellerId === tempProduct.sellerId.toString()) {
                        let pri = (tempProduct.discount !== 0) ? (tempProduct.price - Math.floor((tempProduct.price * tempProduct.discount) / 100)) : tempProduct.price;
                        pri = pri - Math.floor((pri * commition) / 100);
                        price += pri * prod.quantity;
                        products.push({
                            _id: prod._id,
                            quantity: prod.quantity,
                            productInfo: tempProduct
                        });
                    }
                });
                return {
                    sellerId,
                    shopName: products[0]?.productInfo.shopName,
                    price,
                    products
                };
            });

            responseReturn(res, 200, {
                card_products: p,
                price: calculatePrice,
                card_product_count,
                shipping_fee: 5 * p.length,
                outOfStockProduct,
                buy_product_item: stockProduct.reduce((total, p) => total + p.quantity, 0)
            });
        } catch (error) {
            console.log(error);
        }
    };

    delete_card_product = async (req, res) => {
        const { card_id } = req.params
        try {
            await cardModel.findByIdAndDelete(card_id)
            responseReturn(res, 200, { message: 'success' })
        } catch (error) {
            console.log(error.message)
        }
    }
    quantity_inc = async (req, res) => {
        const { card_id } = req.params
        try {
            const product = await cardModel.findById(card_id)
            const { quantity } = product
            await cardModel.findByIdAndUpdate(card_id,
                {
                    quantity: quantity + 1
                })
            responseReturn(res, 200, { message: 'success' })
        } catch (error) {
            console.log(error.message)
        }
    }
    quantity_dec = async (req, res) => {
        const { card_id } = req.params
        try {
            const product = await cardModel.findById(card_id)
            const { quantity } = product
            await cardModel.findByIdAndUpdate(card_id,
                {
                    quantity: quantity - 1
                })
            responseReturn(res, 200, { message: 'success' })
        } catch (error) {
            console.log(error.message)
        }
    }

    add_wishlist = async (req, res) => {
        const {
            slug
        } = req.body
        try {
            const product = await wishlistModel.findOne({
                slug
            })
            if (product) {
                responseReturn(res, 404, {
                    error: 'Allready added'
                })
            } else {
                await wishlistModel.create(req.body)
                responseReturn(res, 201, {
                    message: 'add to wishlist success'
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    get_wishlists = async (req, res) => {
        const {
            userId
        } = req.params;
        try {
            const wishlists = await wishlistModel.find({
                userId
            })
            responseReturn(res, 200, {
                wishlistCount: wishlists.length,
                wishlists
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    delete_wishlist = async (req, res) => {
        const {
            wishlistId
        } = req.params
        try {
            const wishlist = await wishlistModel.findByIdAndDelete(wishlistId)
            responseReturn(res, 200, {
                message: 'Remove success',
                wishlistId
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    add_compare = async (req, res) => {
        const {
            slug
        } = req.body
        try {
            const product = await compareModel.findOne({
                slug
            })
            if (product) {
                responseReturn(res, 404, {
                    error: 'Allready added'
                })
            } else {
                await compareModel.create(req.body)
                responseReturn(res, 201, {
                    message: 'add to Compare success'
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    get_compares = async (req, res) => {
        const {
            userId
        } = req.params;
        try {
            const comparelist = await compareModel.find({
                userId
            })
            responseReturn(res, 200, {
                compareCount: comparelist.length,
                comparelist
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    delete_compare = async (req, res) => {
        const {
            compareId
        } = req.params
        try {
            const comparelist = await compareModel.findByIdAndDelete(compareId)
            responseReturn(res, 200, {
                message: 'Remove success',
                compareId
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = new cardController()