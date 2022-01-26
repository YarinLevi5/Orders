const express = require("express"),
    app = express(),
    port = 4000;

let mongoose = require("mongoose"),
    Client = require('./models/client'),
    Store = require('./models/store'),
    Order = require('./models/order');
// const clients = require("./models/client");

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    return res.json({
        hello: "world"
    })
})
mongoose
    .connect("mongodb://0.0.0.0:27017/shop").then(() => {
        app.listen(port, () => {
            console.info(`start server start listening on port ${port}`)
        })
    }).catch(err => console.error(err));

//add 

app.post('/insert-client', (req, res) => {
    let {
        name,
        adress,
        isVip,
        phone
    } = req.body

    let client = new Client({
        name,
        adress,
        isVip,
        phone
    })
    client.save((err, client) => {
        console.log(err ? err : client);
    })
    res.send('Insert one client')
})
app.post('/insert-store', (req, res) => {
    let {
        name,
        adress,
        phone
    } = req.body

    let store = new Store({
        name,
        adress,
        phone
    })
    store.save((err, store) => {
        console.log(err ? err : store);
    })
    res.send('Insert one store')
})
app.post('/insert-order', (req, res) => {
    let {
        client,
        store
    } = req.body;
    let order = new Order({
        client,
        store
    })
    order.save((err, order) => {
        console.log(err ? error : order);
    })
    res.send('Insert one order')
})

//find all 

app.get('/find-client', (req, res) => {
    Client.find((err, client) => {
        console.log(err ? error : res.json(client));
    })
})

app.get('/find-store', (req, res) => {
    Store.find((err, store) => {
        console.log(err ? error : res.json(store));
    })
})
app.get('/find-order', (req, res) => {
    Order.find((err, order) => {
        console.log(err ? error : res.json(order));
    })
})

//update 

app.patch('/client/:id', (req, res) => {
    let clientId = req.params.id;
    Client.findOneAndUpdate({
        id: clientId
    }, {
        $set: {
            name: 'yarin'
        }
    }, (err, update) => {
        console.log(err ? err : res.json(update))
    })
})

app.put('/store/:id', (req, res) => {
    let storeId = req.params.id;
    Store.findOneAndUpdate({
        id: storeId
    }, {
        $set: {
            name: 'Bershka',
            adress: 'hadera,30'
        }
    }, (err, update) => {
        console.log(err ? err : res.json(update))
    })
})

app.patch('/order/:id', (req, res) => {
    let orderId = req.params.id;
    Order.findOneAndUpdate({
        _id: orderId
    }, {
        $set: {
            store: '61efc4f280d303777aee3a2e'
        }
    }, (err, update) => {
        console.log(err ? err : res.json(update))
    })
})

//query param

app.get('/client', (req, res) => {
    let name = req.query.name;
    Client.find({
        name
    }, (err, client) => {
        console.log(err ? error : res.json(client));
    })
})

//find by id or name

app.get('/client/:id', (req, res) => {
    let clientId = req.params.id;
    Client.find({
        _id: clientId
    }, (err, client) => {
        console.log(err ? err : res.json(client));
    })
})

app.get('/find-store-id/:id', (req, res) => {
    let id = req.params.id;
    Store.find({
        _id: id
    }, (err, store) => {
        console.log(err ? error : res.json(store));
    })
})
app.get('/find-store-name/:name', (req, res) => {
    let storeName = req.params.name;
    Store.find({
        name: storeName
    }, (err, store) => {
        console.log(err ? error : res.json(store));
    })
})