const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var session = require('express-session');
var store = session.MemoryStore();
const expressLayouts = require('express-ejs-layouts')
//const config = require('..../Config/config');

const url = 'mongodb+srv://userADM:testeVM-2019@corridascompartilhadas-a5uze.mongodb.net/test?retryWrites=true'
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(url,options);
mongoose.set('useCreateIndex',true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexao no banco de dados.' + err);
})

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados.');
})

mongoose.connection.on('connected',() => {
    console.log('Aplicação conectada ao banco de dados.');
})

app.set('view engine', 'ejs')    // Setamos que nossa engine será o ejs
app.use(expressLayouts)          // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(session(
    {   
        secret: 'secretKey', 
        resave: false, 
        saveUninitialized: false, 
        cookie:{
            path: '/',
            httpOnly: false
        },
        store: store
    })
)

//Definir as constantes com as localizações das funcionalidades do sistema 
const indexRoute = require('./Routes/index');
const motoristaRoute = require('./Routes/Motorista');
const passageiroRoute = require('./Routes/Passageiro');
const corridaRoute = require('./Routes/Corrida');
//const telaInicio = require('./Front/main');

//Definir os caminhos que deverão ser usados para se acessar as paginas do sistema via browser
app.use('/',indexRoute);
app.use('/Motorista',motoristaRoute);
app.use('/Passageiro',passageiroRoute);
app.use('/Corrida',corridaRoute);
//app.use('/Inicio',telaInicio);

app.listen(3000);

module.exports = app;
