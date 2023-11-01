module.exports = app => {
    const products = require('../controller/product.controller.js');
    var router = require('express').Router(); // access rest api methods
    
    // create a new route
    router.get('/', products.showAll);
    router.get('/product/:productId', products.getProduct);
    router.post('/create', products.create);
    router.put('/update/:id', products.update);
    router.delete('/delete/:id', products.delete);
    router.delete('/deleteall', products.deleteAll);
    app.use('/api/products/', router);
};