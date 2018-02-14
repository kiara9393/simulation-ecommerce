var express = require('express');
var router = express.Router();

var ecommerce = require('simulation-ecommerce');
var validTokens = ['Pippo','Caio','Sempronio','Ciccio'];

var authUser = function(req, res, next) {
    if (validTokens.includes(req.query.token)){
        return next();
    }
    res.status(401).json({message:'Invalid token'});
}

router.get('/products', function(req, res) {
    res.json(ecommerce.getProducts());
})

router.post('/products', authUser, function(req, res) {
    res.json({"ciao":ecommerce.buyProduct(req.body.id, req.query.token,)});
})
module.exports = router;
