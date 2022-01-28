let Client = require('../models/client');

let insertClient = (name, adress, isVip, phone) => {
    return new Promise((resolve, reject) => {
        let client = new Client({
            name,
            adress,
            isVip,
            phone
        })
        client.save((err, clientsData) => {
            clientsData ? resolve(clientsData) : reject(err);
        })
    })
}


function findClients() {
    return new Promise((resolve, reject) => {
        Client.find((err, client) => {
            client ? resolve(client) : reject(err)
        })
    })

}

let updateClientById = (clientId, name, adress, isVip, phone) => {
    return new Promise((resolve, reject) => {
        Client.findOneAndUpdate({
            _id: clientId
        }, {
            $set: {
                name,
                adress,
                isVip,
                phone
            }
        }, (err, updateClient) => {
            updateClient ? resolve(updateClient) : reject(err);
        })
    })
}

let clientByName = (name) => {
    return new Promise((resolve, reject) => {
        Client.find({
            name
        }, (err, client) => {
            client ? resolve(client) : reject(err);
        })
    })
}

let clientById = (clientId) => {
    return new Promise((resolve, reject) => {
        Client.find({
            _id: clientId
        }, (err, client) => {
            client ? resolve(client) : reject(err);
        })
    })
}


module.exports = {
    insertClient,
    findClients,
    updateClientById,
    clientByName,
    clientById
}