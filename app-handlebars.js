const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Pagamento = require('./model/Pagamento');
const moment = require('moment');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.engine('handlebars', handlebars(
    {
        defaltLayout: 'main',
        helpers: {
            formatDate: (date) => {
                return moment(date).format('DD/MM/YYYY');
            }
        },
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        }
    }
));
app.set('view engine', 'handlebars');

//Rotas
app.get('/cad-pagamento', function (req, res) {
    res.render('cad-pagamento');
});

app.get('/pagamento', function (req, res) {
    Pagamento.findAll({ order: [['id', 'DESC']] }).then(function (pagamentos) {
        res.render('pagamento', { pagamentos });
    })
})

app.post('/add-pagamento', function (req, res) {
    Pagamento.create({
        nome: req.body.nome,
        valor: req.body.valor
    }).then(function () {
        res.redirect('/pagamento');
        // res.send('Pagamento Cadastrado com Sucesso');
    }).catch(function (err) {
        res.send('Erro: Pagamento não foi cadastrado com sucesso!' + err);
    })
    // res.send('Nome: ' + req.body.nome + '<br>Valor: ' + req.body.valor + '<br>');
})

app.get('/del-pagamento/:id', function (req, res) {
    Pagamento.destroy({
        where: {
            'id': req.params.id
        }
    }).then(function () {
        res.redirect('/pagamento');
        // res.send('Pagamento apagado com sucesso');
    }).catch(function (err) {
        res.send('Erro: Pagamento não foi apagado com sucesso!' + err);
    })
})
app.listen(8080);