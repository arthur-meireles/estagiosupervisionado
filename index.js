//IMPORTS
const express = require('express');
const app = express();
const porta = 3000;
const bodyParser = require('body-parser');
const connection = require('./database/database');
const alunoModel = require('./database/Aluno')

//Conexão
connection.authenticate().then(() => {
    console.log('conexao estabelecida.')
}).catch((msgError) => {
    console.log(msgError);
});

//Usando EJS e pasta com arquivos estáticos
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Traduz form para js
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());



//ROTAS

//Homepage
app.get('/', (req, res) => {
    res.render('index');
});


//Cadastro de horas
app.get('/cadastrar', (req, res) => {
    res.render('cadastrar');
});

app.post('/cadastrar', (req, res) => {
    var nome = req.body.nome;
    var matricula = req.body.matricula;
    var curso = req.body.curso;
    var turma = req.body.turma;
    var horas = req.body.horas;
    var aluno = {
        nome,
        matricula,
        curso,
        turma,
        horas,
    }
    console.log(aluno)
    res.redirect('/');

    //Tratar documento
});

//Pesquisar
app.get('/pesquisar', (req, res) => {
    res.render('pesquisar');
});
app.post('/')

//SERVIDOR
app.listen(porta, () => {
    console.log('Servidor on na porta:' + porta);
});