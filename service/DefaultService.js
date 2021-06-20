'use strict';


/**
 * Restituisce tutti i prodotti
 *
 * offset Integer The number of items to skip before starting to collect the result set. (optional)
 * limit Integer The numbers of items to return. (optional)
 * returns ProductList
 **/
exports.productsGET = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "total" : 0,
  "products" : [ {
    "auantita" : 1,
    "produttore" : "produttore",
    "nome" : "nome",
    "id" : 6
  }, {
    "auantita" : 1,
    "produttore" : "produttore",
    "nome" : "nome",
    "id" : 6
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
    var examples = {};
    examples['application/json'] = {
  "auantita" : 1,
  "produttore" : "produttore",
  "nome" : "nome",
  "id" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
    var examples = {};
    examples['application/json'] = {
  "auantita" : 1,
  "produttore" : "produttore",
  "nome" : "nome",
  "id" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

