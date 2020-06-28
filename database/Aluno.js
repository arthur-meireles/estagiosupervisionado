 //Imports
 const Sequelize = require('sequelize');
 const connection = require('./database');

 //Model 
 const Aluno = connection.define('aluno', {
     nome: {
         type: Sequelize.STRING,
         allowNull: false
     },
     matricula: {
         type: Sequelize.STRING,
         allowNull: false
     },
     curso: {
         type: Sequelize.STRING,
         allowNull: false
     },
     turma: {
         type: Sequelize.STRING,
         allowNull: false
     },
     horas: {
         type: Sequelize.STRING,
         allowNull: false
     },
     file: {
         type: Sequelize.STRING,
         allowNull: false
     },
 });

 Aluno.sync({
     force: false
 }).then(() => {
     console.log("Table Aluno created.")
 });

 module.exports = Aluno;