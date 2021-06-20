const ProductModel = require('./product.js')

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
var database = process.env.POSTGRES_HOST || config.database
var username = process.env.POSTGRES_USERNAME || config.username
var password = process.env.POSTGRES_PASSWORD || config.password

var sequelize = require('sequelize');
const sequelizeconn = new sequelize(database, username, password, config);

const Product = ProductModel(sequelizeconn, sequelize);

sequelizeconn.sync({force: config.forcedbreset}).then(() => {console.log('Databases and tables created')})

module.exports = {
    sequelizeconn,
    Product
}