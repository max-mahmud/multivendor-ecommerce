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
}

module.exports = new orderController()