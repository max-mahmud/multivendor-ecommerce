const categoryModel = require('../../models/categoryModel')
const productModel = require('../../models/productModel');
const customerOrder = require('../../models/customerOrder')
const reviewModel = require('../../models/reviewModel')
const queryProducts = require('../../utiles/queryProducts');
const { responseReturn } = require('../../utiles/response');

const { mongo: { ObjectId } } = require('mongoose')
const moment = require('moment')

class homeControllers {

    formateProduct = (products) => {
        const productArray = [];
        let i = 0;
        while (i < products.length) {
            let temp = []
            let j = i
            while (j < i + 3) {
                if (products[j]) {
                    temp.push(products[j])
                }
                j++
            }
            productArray.push([...temp])
            i = j
        }
        return productArray
    }

    get_categorys = async (req, res) => {
        try {
            const categorys = await categoryModel.find({})
            responseReturn(res, 200, { categorys })
        } catch (error) {
            console.log(error.message)
        }
    }

    get_products = async (req, res) => {
        try {
            const products = await productModel.find({}).limit(12).sort({ createdAt: -1 })

            const allProduct1 = await productModel.find({}).limit(9).sort({ createdAt: -1 })
            const latest_product = this.formateProduct(allProduct1);

            const allProduct2 = await productModel.find({}).limit(9).sort({ rating: -1 })
            const topRated_product = this.formateProduct(allProduct2);

            const allProduct3 = await productModel.find({}).limit(9).sort({ discount: -1 })
            const discount_product = this.formateProduct(allProduct3);

            responseReturn(res, 200, {
                products,
                latest_product,
                topRated_product,
                discount_product
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    price_range_product = async (req, res) => {
        try {
            const priceRange = {
                low: 0,
                high: 0
            }
            const products = await productModel.find({}).limit(9).sort({ createdAt: -1 })
            const latest_product = this.formateProduct(products);
            const getForPrice = await productModel.find({}).sort({ 'price': 1 })
            if (getForPrice.length > 0) {
                priceRange.high = getForPrice[getForPrice.length - 1].price
                priceRange.low = getForPrice[0].price
            }
            responseReturn(res, 200, { latest_product, priceRange })
        } catch (error) {
            console.log(error.message)
        }
    }

    query_products = async (req, res) => {
        const parPage = 12
        req.query.parPage = parPage
        // const abc = JSON.stringify(req.query.color)
        // console.log(req.query)
        try {
            const products = await productModel.find({}).sort({ createdAt: -1 })
            const totalProduct = new queryProducts(products, req.query).categoryQuery().searchQuery().priceQuery().ratingQuery().Availability().colorQuery().tagQuery().countProducts();

            const result = new queryProducts(products, req.query).categoryQuery().searchQuery().ratingQuery().priceQuery().sortByPrice().Availability().sortByOldTONew().colorQuery().tagQuery().skip().limit().getProducts();

            responseReturn(res, 200, { products: result, totalProduct, parPage })

        } catch (error) {
            console.log(error.message)
        }
    }
    get_product = async (req, res) => {
        const {
            slug
        } = req.params
        try {
            const product = await productModel.findOne({
                slug
            })
            const relatedProducts = await productModel.find({
                $and: [{
                    _id: {
                        $ne: product.id
                    }
                },
                {
                    category: {
                        $eq: product.category
                    }
                }
                ]
            }).limit(12)
            responseReturn(res, 200, {
                product,
                relatedProducts,
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    advanced_search = async (req, res) => {
        const parPage = 7
        req.query.parPage = parPage
        try {
            const products = await productModel.find({}).sort({ createdAt: -1 })
            const totalProduct = new queryProducts(products, req.query).searchQuery().limit().getProducts()
            const simplifiedProducts = totalProduct.map(product => ({
                name: product.name,
                images: product.images[1]
            }));
            responseReturn(res, 200, {
                totalProduct: simplifiedProducts,
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    submit_review = async (req, res) => {
        const {
            name,
            rating,
            review,
            productId,
            userId
        } = req.body
        try {
            const totalOrder = await customerOrder.find({
                customerId: new ObjectId(userId), payment_status: "paid"
            })
            let result = [];
            for (let item of totalOrder) {
                for (let prd of item.products) {
                    result.push(prd._id)
                }
            }
            const isExist = result.filter(p => p.toString() === productId.toString())
            if (isExist.length > 0) {
                await reviewModel.create({
                    productId,
                    name,
                    rating,
                    review,
                    date: moment(Date.now()).format('LL')
                })
            } else {
                return responseReturn(res, 404, { error: 'You Did not Parchest This Product , Yet' })
            }
            let rat = 0;
            const reviews = await reviewModel.find({
                productId
            });
            for (let i = 0; i < reviews.length; i++) {
                rat = rat + reviews[i].rating
            }
            let productRating = 0;

            if (reviews.length !== 0) {
                productRating = (rat / reviews.length).toFixed(1)
            }

            await productModel.findByIdAndUpdate(productId, {
                rating: productRating
            })

            responseReturn(res, 201, {
                message: "Review Success"
            })
        } catch (error) {
            console.log(error)
        }
    }

    get_reviews = async (req, res) => {
        const {
            productId
        } = req.params
        let {
            perPage
        } = req.query
        perPage = parseInt(perPage)

        try {
            let getRating = await reviewModel.aggregate([{
                $match: {
                    productId: {
                        $eq: new ObjectId(productId)
                    },
                    rating: {
                        $not: {
                            $size: 0
                        }
                    }
                }
            },
            {
                $unwind: "$rating"
            },
            {
                $group: {
                    _id: "$rating",
                    count: {
                        $sum: 1
                    }
                }
            }
            ])
            const rating_review = Array.from({ length: 5 }, (_, i) => ({ rating: 5 - i, sum: 0 }));

            for (let i = 0; i < rating_review.length; i++) {
                for (let j = 0; j < getRating.length; j++) {
                    if (rating_review[i].rating === getRating[j]._id) {
                        rating_review[i].sum = getRating[j].count
                        break
                    }
                }
            }
            const getAll = await reviewModel.find({
                productId
            })
            const reviews = await reviewModel.find({
                productId
            }).limit(perPage).sort({
                createdAt: -1
            })
            responseReturn(res, 200, {
                reviews,
                totalReview: getAll.length,
                rating_review
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new homeControllers()