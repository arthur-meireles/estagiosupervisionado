//IMPORTS
const express = require('express');
const app = express();
const porta = 3000;
const bodyParser = require('body-parser');
const multer = require('multer');
const connection = require('./database/database');
const Aluno = require('./database/Aluno')
const uploadsPath = 'uploads/';
var download = require('download-file')

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

//Configurando Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage
});

//Configurando opções de download
var options = {
    directory: uploadsPath,
}


//ROTAS

//Homepage
app.get('/', (req, res) => {
    res.render('index');
});


//Cadastro de horas
app.get('/cadastrar', (req, res) => {
    res.render('cadastrar');
});

app.post('/cadastrar', upload.single('file'), (req, res) => {
    var nome = req.body.nome;
    var matricula = req.body.matricula;
    var curso = req.body.curso;
    var turma = req.body.turma;
    var horas = req.body.horas;
    var file = req.file.path;
    console.log(file);
    Aluno.create({
        nome,
        matricula,
        curso,
        turma,
        horas,
        file,
    }).then(() => {
        res.redirect('/pesquisar');
    });
});

//Baixar arquivo
app.get('/baixar', (req, res) => {
    url = req.query.path;
    res.download(url);
});

//Pesquisar
app.get('/pesquisar', (req, res) => {
    Aluno.findAll({
        raw: true,
        order: [
            ['matricula', 'ASC'],
        ]
    }).then(alunos => {
        res.render('pesquisar', {
            alunos
        })
    });
});

app.get('/resultados', async (req, res) => {
    var pesquisa = req.query.pesquisa;
    console.log(pesquisa)
    await Aluno.findAll({
        raw: true,
        where: {
            matricula: pesquisa
        }
    }).then(resultados => {
        res.render('resultados', {
            resultados
        })
    });
});

//SERVIDOR
app.listen(porta, () => {
    console.log('Servidor on na porta:' + porta);
});