const express = require("express"),
    app = express(),
    port = 3000;

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
        console.log(err ? error : client);
    })
    res.send('Insert one client')
})
app.post('/insert-store', (req, res) => {
    let store = new Store({
        name: 'zara',
        adress: 'habanim 2,haifa',
        phone: '0523776812'
    })
    store.save((err, store) => {
        console.log(err ? error : store);
    })
    res.send('Insert one store')
})
app.post('/insert-order', (req, res) => {
    let order = new Order({
        client: "61efc2f9fefbcd4c5770ffe8",
        store: "61efc3ff11cba7f33ae62071"
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
        id: orderId
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
    let id = req.params.id;
    Client.findOne({
        id: id
    }, (err, client) => {
        console.log(err ? error : res.json(client));
    })
})

app.get('/find-store-id/:id', (req, res) => {
    let id = req.params.id;
    Store.findOne({
        id
    }, (err, store) => {
        console.log(err ? error : res.json(store));
    })
})
app.get('/find-store-name/:name', (req, res) => {
    let storeName = req.params.name;
    Store.findOne({
        name: storeName
    }, (err, store) => {
        console.log(err ? error : res.json(store));
    })
})