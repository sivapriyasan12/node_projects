const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express(); // to access res api
app.use(express.json());
const db = require('./model');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database");
}).catch(err => {
    console.log("Cannot connect database", err);
    process.exit();
});
// db.mongoose.connection.dropCollection('cart');
// to access api url
app.get("/", (req, res) => {
    res.json({"message": "Welcome!!"})
});

app.get("/products", (req, res) => {
    res.json({"message": "Products!!"})
});

app.get("/cart", (req, res) => {
    res.json({"message": "cart!!"})
});
require('./routes/product.routes.js')(app);
require('./routes/cart.routes.js')(app);
const port = process.env.port || 8084;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`);
});