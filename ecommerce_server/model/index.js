const dbconfig = require('../config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // enable promise object db and node

const db = {}; // db connections properties to establish
db.mongoose = mongoose;
db.url = dbconfig.url;
db.products = require('./product.model.js')(mongoose);
db.cart = require('./cart.model.js')(mongoose);
module.exports = db;