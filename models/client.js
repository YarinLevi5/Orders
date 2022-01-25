let mongoose = require('mongoose');
let clients = mongoose.model('Clients', new mongoose.Schema({
    name: {
        type: String
    },
    adress: {
        type: String
    },
    isVip: {
        type: Boolean
    },
    phone: {
        type: String
    }
}));

module.exports = clients;