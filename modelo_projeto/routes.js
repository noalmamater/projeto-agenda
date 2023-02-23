const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeControllers');
const loginController = require('./src/controllers/loginControllers');
const contactsController = require('./src/controllers/contactsControllers');
const {loginRequired} = require('./src/middlewares/globalMiddlewares');

//rotas da home
route.get('/', homeController.index);

//rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//rotas de contato
route.get('/contato/index', loginRequired, contactsController.index);
route.post('/contato/register', loginRequired, contactsController.register);
route.get('/contato/index/:id', loginRequired, contactsController.editIndex);
route.post('/contato/edit/:id', loginRequired, contactsController.edit);
route.get('/contato/delete/:id', loginRequired, contactsController.delete);
module.exports = route;

