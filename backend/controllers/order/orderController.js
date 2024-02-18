const authOrderModel = require('../../models/authOrder')
const customerOrder = require('../../models/customerOrder')
const cardModel = require('../../models/cardModel')

const { mongo: { ObjectId } } = require('mongoose')
const { responseReturn } = require('../../utiles/response')

const moment = require('moment')
const stripe = require("stripe")(
    "sk_test_51N8amPIt63Wcx3eVr72l77kfPTDgInVEaTT9d4G1JgngM0YEgAIwocli1hC0sKidMuzPiUNimOpqxXtIKeFkhnQo00EQgFUaDA"
);

class orderController {

    paymentCheck = async (id) => {
        try {
            const order = await customerOrder.findById(id)
            if (order.payment_status === 'unpaid') {
                await customerOrder.findByIdAndUpdate(id, {
                    delivery_status: 'cancelled'
                })
                await authOrderModel.updateMany({
                    orderId: id
                }, {
                    delivery_status: "cancelled"
                })
            }
            return true
        } catch (error) {
            console.log(error)
        }
    }

    place_order = async (req, res) => {
        const {
            price,
            products,
            shipping_fee,
            shippingInfo,
            userId
        } = req.body
        let authorOrderData = []
        let cardId = []
        const tempDate = moment(Date.now()).format('LLL')

        let customerOrderProduct = []

        for (let i = 0; i < products.length; i++) {
            const pro = products[i].products
            for (let j = 0; j < pro.length; j++) {
                let tempCusPro = pro[j].productInfo
                tempCusPro.quantity = pro[j].quantity
                customerOrderProduct.push(tempCusPro)
                if (pro[j]._id) {
                    cardId.push(pro[j]._id)
                }
            }
        }

        try {
            const order = await customerOrder.create({
                customerId: userId,
                shippingInfo,
                products: customerOrderProduct,
                price: price + shipping_fee,
                delivery_status: 'pending',
                payment_status: 'unpaid',
                date: tempDate
            })
            for (let i = 0; i < products.length; i++) {
                const pro = products[i].products
                const pri = products[i].price
                const sellerId = products[i].sellerId
                let storePro = []
                for (let j = 0; j < pro.length; j++) {
                    let tempPro = pro[j].productInfo
                    tempPro.quantity = pro[j].quantity
                    storePro.push(tempPro)
                }

                authorOrderData.push({
                    orderId: order.id,
                    sellerId,
                    products: storePro,
                    price: pri,
                    payment_status: 'unpaid',
                    shippingInfo: 'Dhaka Express Warehouse',
                    delivery_status: 'pending',
                    date: tempDate
                })
            }
            await authOrderModel.insertMany(authorOrderData)
            for (let k = 0; k < cardId.length; k++) {
                await cardModel.findByIdAndDelete(cardId[k])
            }
            setTimeout(() => {
                this.paymentCheck(order.id)
            }, 15000)
            responseReturn(res, 201, {
                message: "order placeed success",
                orderId: order.id
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    create_payment = async (req, res) => {
        const { price } = req.body

        try {
            const payment = await stripe.paymentIntents.create({
                amount: price * 100,
                currency: 'usd',
                automatic_payment_methods: {
                    enabled: true
                }
            })
            responseReturn(res, 200, { clientSecret: payment.client_secret })
        } catch (error) {
            console.log(error.message)
        }
    }

    get_seller_orders = async (req, res) => {

        const { sellerId } = req.params
        let { page, parPage, searchValue } = req.query
        page = parseInt(page)
        parPage = parseInt(parPage)

        const skipPage = parPage * (page - 1)


        try {
            if (searchValue) {
                //td search value
            } else {
                const orders = await authOrderModel.find({
                    sellerId,
                }).skip(skipPage).limit(parPage).sort({ createdAt: -1 })
                const totalOrder = await authOrderModel.find({
                    sellerId,
                }).countDocuments()
                responseReturn(res, 200, { orders, totalOrder })
            }
        } catch (error) {
            console.log('get seller order error ' + error.message)
            responseReturn(res, 500, { message: 'internal server error' })
        }
    }

    get_seller_order = async (req, res) => {

        const { orderId } = req.params

        try {
            const order = await authOrderModel.findById(orderId)

            responseReturn(res, 200, { order })
        } catch (error) {
            console.log('get admin order ' + error.message)
        }
    }

    seller_order_status_update = async (req, res) => {
        const { orderId } = req.params
        const { status } = req.body

        try {
            await authOrderModel.findByIdAndUpdate(orderId, {
                delivery_status: status
            })
            responseReturn(res, 200, { message: 'order status change success' })
        } catch (error) {
            console.log('get admin order status error ' + error.message)
            responseReturn(res, 500, { message: 'internal server error' })
        }
    }


    get_admin_orders = async (req, res) => {
        let { page, parPage, searchValue } = req.query
        page = parseInt(page)
        parPage = parseInt(parPage)

        const skipPage = parPage * (page - 1)

        try {
            if (searchValue) {
                //td search value
            } else {
                const orders = await customerOrder.aggregate([
                    {
                        $lookup: {
                            from: 'authororders',
                            localField: "_id",
                            foreignField: 'orderId',
                            as: 'suborder'
                        }
                    }
                ]).skip(skipPage).limit(parPage).sort({ createdAt: -1 })

                const totalOrder = await customerOrder.aggregate([
                    {
                        $lookup: {
                            from: 'authororders',
                            localField: "_id",
                            foreignField: 'orderId',
                            as: 'suborder'
                        }
                    }
                ])

                responseReturn(res, 200, { orders, totalOrder: totalOrder.length })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    get_admin_order = async (req, res) => {
        const { orderId } = req.params

        try {
            const order = await customerOrder.aggregate([
                {
                    $match: { _id: new ObjectId(orderId) }
                }, {
                    $lookup: {
                        from: 'authororders',
                        localField: '_id',
                        foreignField: 'orderId',
                        as: 'suborder'
                    }
                }
            ])
            responseReturn(res, 200, { order: order[0] })
        } catch (error) {
            console.log('get admin order ' + error.message)
        }
    }

    admin_order_status_update = async (req, res) => {
        const { orderId } = req.params
        const { status } = req.body

        try {
            await customerOrder.findByIdAndUpdate(orderId, {
                delivery_status: status
            })
            responseReturn(res, 200, { message: 'Order Status Change Success' })
        } catch (error) {
            // console.log('get admin order status error ' + error.message)
            responseReturn(res, 500, { message: 'Internal server error' })
        }
    }

}

module.exports = new orderController()