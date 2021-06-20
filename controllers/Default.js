'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.productsGET = function productsGET (req, res, next, offset, limit) {
  Default.productsGET(offset, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.productsPOST = function productsPOST (req, res, next, body) {
  Default.productsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.productsProductIdPUT = function productsProductIdPUT (req, res, next, body, productId) {
  Default.productsProductIdPUT(body, productId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
