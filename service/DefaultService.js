'use strict';
const Context = require('../models/stock-microservice-context.js')
var Sequelize = require('sequelize');

function buildProductForDB(product) {
  var docItem = {}
  docItem["name"] = product.nome;
  docItem["manufacturer"] = product.produttore;
  docItem["availableAmount"] = product.quantita;
  return docItem;
}

function buildProductFromDB(product) {
  var docItem = {}
  docItem["id"] = product.id;
  docItem["nome"] = product.name;
  docItem["produttore"] = product.manufacturer;
  docItem["quantita"] = product.availableAmount;
  return docItem
}

/**
 * Restituisce tutti i prodotti
 *
 * offset Integer The number of items to skip before starting to collect the result set. (optional)
 * limit Integer The numbers of items to return. (optional)
 * returns ProductList
 **/
exports.productsGET = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var result = {
      products: [],
      total: 0
    }
    Context.Product.findAndCountAll({
      limit: limit,
      offset: offset,
    }).then(function (products) {
      console.log(products);
      result.total = products.count
      products.rows.forEach(function (product) {
        result.products.push(buildProductFromDB(product));
      })
      resolve(result);
    })
  });
}


/**
 * Crea un nuovo prodotto
 *
 * body Product 
 * returns Product
 **/
exports.productsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    Context.sequelizeconn.transaction(t => {
      return Context.Product.create(buildProductForDB(body),
        {
          transaction: t
        }).then(updateProduct => {
          body.id = updateProduct.id
        })
    }).then(result => {
      resolve(body);
    }).catch(error => {
      console.log(error)
    });
  });
}


/**
 * Modifica un prodotto
 *
 * body Product 
 * productId String 
 * returns Product
 **/
exports.productsProductIdPUT = function(body,productId) {
  return new Promise(function(resolve, reject) {
    Context.sequelizeconn.transaction(t => {
      return Context.Product.update(
        buildProductForDB(body),
        {
          where: { id: productId },
          transaction: t
        }
      )
    })
      .then(result => {
        resolve(body);
      }).catch(error => {
        console.log(error)
      });
  });
}

