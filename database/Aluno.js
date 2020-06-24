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
         type: Sequelize.INTEGER,
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
         type: Sequelize.INTEGER,
         allowNull: false
     }
 });

 Aluno.sync({
     force: false
 }).then(() => {
     console.log("Tabela Aluno criada.")
 });