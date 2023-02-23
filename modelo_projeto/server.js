
require('dotenv').config();
const express = require('express');
const app = express();
//o mongoose modela a base de dados e certifica o save de acordo com o especificado
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.emit('ready');
})
.catch(e => console.log(e));
//Session para salvar a seção do cliente via cookies
const session = require('express-session');
//MongoStore serve p/ salvar a seção dentro da bse de dados ao invés da memória
const MongoStore = require('connect-mongo');
//Flash para avisos temporários flash (são salvos na sessão)
const flash = require('connect-flash');
//routes para chamar o arquivo de rotas
const routes = require('./routes');
const path = require('path');
//Para importar o Helmet
// const helmet = require('helmet');
const {globalMiddleware} = require('./src/middlewares/globalMiddlewares');

// app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//Informe de local para todos os arq. estáticos (ex: img, css, js, etc)
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'aaaaaain',
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());
//Views são os aquivos que renderizamos na tela
app.set('views', path.resolve(__dirname, 'src', 'views'));
//engine que estamos utilizando para renderizar o html, neste caso o ejs
app.set('view engine', 'ejs');
app.use(globalMiddleware);
app.use(routes);

app.on('ready', () => {
    app.listen(3000, () => {
        console.log('http://localhost:3000')
        console.log('servidor executando');
    });
});
