module.exports = (sequelize, type) => {
    return sequelize.define('product', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING(1024),
        manufacturer: type.STRING(1024),
        availableAmount: type.INTEGER
    })
}