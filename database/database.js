 const Sequelize = require('sequelize');

 //Conexão
 const connection = new Sequelize('horascomplementares', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
 });

 module.exports = connection;