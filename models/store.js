let mongoose = require("mongoose");
let store = mongoose.model('Store', new mongoose.Schema({
    name: {
        type: String
    },
    adress: {
        type: String
    },
    phone: {
        type: String
    }
}))

module.exports = store;