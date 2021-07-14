const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('celke', 'celkeone', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function () {
    console.log('Conexão realizada com sucesso');
}).catch(function (err) {
    console.log('Erro ao realizar conexão com banco de dados: ' + err);
});


const Pagamento = sequelize.define('pagamentos', {
    //colunas
    nome: {
        type: DataTypes.STRING
    },
    valor: {
        type: DataTypes.DOUBLE
    }
});

//Criar tabela com Sequelize
// Pagamento.sync({ force: true });

//inserir registro no BD
// Pagamento.create({ nome: 'Energia', valor: 220 });