const http = require('http');
const debug = require('debug')('celke:server');
const express = require('express');

const app = express();
const port = 3000;
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

//Conexão com BD MySql
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'celkeone',
    password: '123456',
    database: 'celke'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

//buscar tudo
connection.query('SELECT * FROM users', function (err, rows, fields) {
    if (!err) {
        console.log('Resultado: ', rows)
    } else {
        console.log('Erro ao realizar a consulta');
    }
});

//inserir
// connection.query("INSERT INTO users(nome, email) VALUES ('Kelly', 'kelly@celke.com.br')", function (err, rows, fields) {
//     if (!err) {
//         console.log('Usuário cadastrado com sucesso');
//     } else {
//         console.log('Erro ao cadastrar usuário');
//     }
// })

//alterar
// connection.query("UPDATE users SET nome = 'Cesar 1' WHERE id = 1", function (err, rows, fields) {
//     if (!err) {
//         console.log('Usuário alterado com sucesso');
//     } else {
//         console.log('Erro ao alterar usuário');
//     }
// })

//excluir
// connection.query("DELETE FROM users WHERE id = 3", function (err, rows, fields) {
//     if (!err) {
//         console.log('Usuário excluído com sucesso');
//     } else {
//         console.log('Erro ao excluir usuário');
//     }
// })

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node Store API',
        version: '0.0.1'
    })
});

app.use('/', route);
server.listen(port);
