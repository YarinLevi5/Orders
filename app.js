const express = require("express"),
    app = express(),
    port = 4000;

let mongoose = require("mongoose")
let {
    insertClient,
    findClients,
    updateClientById,
    clientByName,
    clientById
} = require('./controllers/clientsController')

let {
    insertStore,
    findAllStores,
    updateStore,
    findStoreById,
    findStoreByName
} = require('./controllers/storesController')

let {
    insertOrder,
    findAllOrders,
    updateOrderById
} = require('./controllers/ordersController');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://0.0.0.0:27017/shop").then(() => {
    app.listen(port, () => {
        console.info(`start server start listening on port ${port}`)
    })
}).catch(err => console.error(err));


app.post('/insert-client', (req, res) => {
    let {
        name,
        adress,
        isVip,
        phone
    } = req.body
    insertClient(name, adress, isVip, phone)
        .then(data => res.json(data))
        .catch(err => console.log(err));
})

app.get('/find-client', (req, res) => {
    findClients()
        .then(resulte => res.json(resulte))
        .catch(err => console.log(err));
})

app.put('/client/:id', (req, res) => {
    let {
        name,
        adress,
        isVip,
        phone
    } = req.body
    updateClientById(req.params.id, name, adress, isVip, phone)
        .then(data => res.json(data))
        .catch(err => console.log(err));
})


app.get('/client', (req, res) => {
    clientByName(req.query.name)
        .then(data => res.json(data))
        .catch(e => console.log(e));
})

app.get('/client/:id', (req, res) => {
    clientById(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err));
})

app.post('/insert-store', (req, res) => {
    let {
        name,
        adress,
        phone
    } = req.body
    insertStore(name, adress, phone)
        .then(data => res.json(data))
        .catch(err => console.log(err));
})

app.get('/find-store', (req, res) => {
    findAllStores()
        .then(data => res.json(data))
        .catch(e => console.log(e));
})

app.put('/store/:id', (req, res) => {
    let {
        name,
        adress
    } = req.body
    updateStore(req.params.id, name, adress)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

app.get('/find-store-id/:id', (req, res) => {
    findStoreById(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err));

})

app.get('/find-store-name/:name', (req, res) => {
    findStoreByName(req.params.name)
        .then(resulte => res.json(resulte))
        .catch(e => console.log(e));
})

app.post('/insert-order', (req, res) => {
    let {
        client,
        store
    } = req.body;
    insertOrder(client, store)
        .then(data => res.json(data))
        .catch(err => console.log(err));

})

app.get('/find-order', (req, res) => {
    findAllOrders()
        .then(data => res.json(data))
        .catch(err => console.log(err));
})

app.put('/order/:id', (req, res) => {
    let {
        client,
        store
    } = req.body;
    updateOrderById(req.params.id, client, store)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})