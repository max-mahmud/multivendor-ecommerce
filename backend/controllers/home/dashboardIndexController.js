const customerOrder = require('../../models/customerOrder')
const { mongo: { ObjectId } } = require('mongoose')
const { responseReturn } = require('../../utiles/response')

class dashboardIndexController {

    get_customer_databorad_data = async (req, res) => {
        const {
            userId
        } = req.params

        try {
            const recentOrders = await customerOrder.find({
                customerId: new ObjectId(userId)
            }).limit(5)
            const pendingOrder = await customerOrder.find({
                customerId: new ObjectId(userId),
                delivery_status: 'pending'
            }).countDocuments()
            const totalOrder = await customerOrder.find({
                customerId: new ObjectId(userId)
            }).countDocuments()
            const cancelledOrder = await customerOrder.find({
                customerId: new ObjectId(userId),
                delivery_status: 'cancelled'
            }).countDocuments()
            responseReturn(res, 200, {
                recentOrders,
                pendingOrder,
                cancelledOrder,
                totalOrder
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = new dashboardIndexController()

