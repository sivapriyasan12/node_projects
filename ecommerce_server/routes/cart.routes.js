module.exports = app => {
    const cart = require('../controller/cart.controller.js');
    var router = require('express').Router(); // access rest api methods

    // create a new route
    router.get('/', cart.ListCart);
    router.post('/add', cart.addToCart),
    router.put('/update', cart.updateCart),
    router.delete('/delete/:id', cart.deleteCartId),
    router.delete('/deleteAll', cart.deleteAll),
    app.use('/api/cart/', router);
};