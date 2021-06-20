'use strict';
const Context = require('../models/stock-microservice-context.js')
var Sequelize = require('sequelize');
var amqp = require('amqplib/callback_api');

function buildProductForDB(product, create) {
  var docItem = {}
  docItem["name"] = product.nome;
  docItem["manufacturer"] = product.produttore;
  if (create == true) {
    docItem["availableAmount"] = product.quantita;  
  } else {
    docItem["availableAmount"] = Sequelize.literal('"availableAmount" + ' + product.quantita);
  }
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
    }).catch(error => {
      resolve(error)
    });
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
          transaction: t,
          returning: true
        }
      ).then(newValue => {
        if (newValue.length >= 2) {
          body.quantita = newValue[1][0].dataValues["availableAmount"]
          amqp.connect('amqp://rabbitmq', function(error0, connection) {
                  if (error0) {
                      throw error0;
                  }
                  connection.createChannel(function(error1, channel) {
                      if (error1) {
                          throw error1;
                      }

                      var queue = 'products';
                      var msg = {
                        id: newValue[1][0].dataValues["id"],
                        nome: newValue[1][0].dataValues["name"],
                        produttore: newValue[1][0].dataValues["manufacturer"],
                        quantita: newValue[1][0].dataValues["availableAmount"],
                      };

                      channel.assertQueue(queue, {
                          durable: false
                      });
                      channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
                  });
                  setTimeout(function() {
                      connection.close();
                      process.exit(0);
                  }, 500);
          });
        }
      })
    })
      .then(result => {
        resolve(body);
      }).catch(error => {
        console.log(error)
      });
  });
}

