let Store = require('../models/store');

let insertStore = (name, adress, phone) => {
    return new Promise((res, rej) => {
        let store = new Store({
            name,
            adress,
            phone
        })
        store.save((err, store) => {
            store ? res(store) : console.log(rej(err));
        })
    })
}


let findAllStores = () => {
    return new Promise((resolve, reject) => {
        Store.find((err, store) => {
            err ? console.log(reject(error)) : resolve(store);
        })
    })
}

let updateStore = (storeId, name, adress) => {
    return new Promise((resolve, reject) => {
        Store.findOneAndUpdate({
            _id: storeId
        }, {
            $set: {
                name,
                adress
            }
        }, (err, updateStore) => {
            err ? reject(err) : resolve(updateStore);
        })
    })
}

let findStoreById = (id) => {
    return new Promise((res, rej) => {
        Store.find({
            _id: id
        }, (err, store) => {
            store ? res(store) : rej(err);
        })
    })
}

let findStoreByName = (storeName) => {
    return new Promise((resolve, reject) => {
        Store.find({
            name: storeName
        }, (err, store) => {
            store ? resolve(store) : reject(err);
        })
    })
}

module.exports = {
    insertStore,
    findAllStores,
    updateStore,
    findStoreById,
    findStoreByName
}