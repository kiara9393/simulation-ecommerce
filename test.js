var assert = require('assert');
var request = require('supertest');
var app = require('./app');


describe('GET users products', function() {
    it('return all products', function(done) {
        request(app)
          .get('/users/products')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            done();
      });
    })

    it('buy single product without token', function(done) {
        request(app)
          .post('/users/products')
          .set('Accept', 'application/json')
          .send({id:1})
          .expect(401)
          .end(function(err, res) {
            if (err) return done(err);
            done();
      });
    })

    it('buy single product with token', function(done) {
        request(app)
          .post('/users/products?token=Pippo')
          .set('Accept', 'application/json')
          .send({id:1})
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            done();
      });
    })
});

describe('GET admin products', function() {
    it('return all products', function(done) {
        request(app)
          .get('/admin/products?token=admin')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            done();
      });
    })

    it('add new product', function(done) {
        request(app)
          .post('/admin/products?token=admin')
          .set('Accept', 'application/json')
          .send({name:'Iphone X plus', amout: 12})
          .expect(201)
          .end(function(err, res) {
            if (err) return done(err);
            done();
      });
    })

    it('delete product with id 1', function(done) {
        request(app)
          .delete('/admin/products/1?token=admin')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            done();
      });
    })
});
