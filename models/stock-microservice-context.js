const ProductModel = require('./product.js')

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

var sequelize = require('sequelize');
const sequelizeconn = new sequelize(config.database, config.username, config.password, config);

const Product = ProductModel(sequelizeconn, sequelize);

sequelizeconn.sync({force: config.forcedbreset}).then(() => {console.log('Databases and tables created')})

module.exports = {
    sequelizeconn,
    Product
}