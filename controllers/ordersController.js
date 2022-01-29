let Order = require('../models/order');

let insertOrder = (client, store) => {
    return new Promise((res, rej) => {
        let order = new Order({
            client,
            store
        })
        order.save((err, order) => {
            order ? res(order) : rej(err);
        })
    })
}

let findAllOrders = () => {
    return new Promise((resolve, reject) => {
        Order.find((err, order) => {
            order ? resolve(order) : reject(err);
        })
    })

}

let findOrderById = (orderId) => {
    return new Promise((resolve, reject) => {
        Order.find({
                _id: orderId
            }).then(data => resolve(data))
            .catch(e => reject(e))
    })
}

let updateOrderById = (orderId, client, store) => {
    return new Promise((resolve, reject) => {
        Order.findOneAndUpdate({
            _id: orderId
        }, {
            $set: {
                client,
                store
            }
        }, (err, updateOrder) => {
            updateOrder ? resolve(updateOrder) : reject(err)
        })
    })
}

module.exports = {
    insertOrder,
    findAllOrders,
    findOrderById,
    updateOrderById
}