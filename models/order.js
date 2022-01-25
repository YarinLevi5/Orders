let mongoose = require("mongoose");
let order = mongoose.model('Order', new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    }
}, {
    timestamps: true
}))

module.exports = order;