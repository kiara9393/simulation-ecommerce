var express = require('express');
var router = express.Router();
var ecommerce = require('simulation-ecommerce');

var auth = function(req, res, next) {
    if (req.query.token === 'admin') {
      return next();
    }
    return res.status(401).json({message: 'Invalid token'})
}

router.get('/products', auth,  function(req, res) {
    res.json(ecommerce.getProducts());
})

router.post('/products', auth,  function(req, res) {
    ecommerce.addProduct(req.body);
    res.status(201).json({message: 'product added'});
})

router.put('/products/:id', auth,  function(req, res) {
    ecommerce.editProduct(parseInt(req.params.id), req.body.name, req.body.amount);
    res.json({message: 'product edited'});
})

router.delete('/products/:id', auth,  function(req, res) {
    ecommerce.deleteProduct(parseInt(req.params.id));
    res.json({message: 'product deleted'});
})

router.get('/history', auth, function(req, res) {
    res.json(ecommerce.getHistorySell());
})

module.exports = router;
