import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/modelo.css';

import Login from './modules/login';
import CreateAcc from './modules/createAcc';
import CreateContact from './modules/createContact';
import EditContact from './modules/editContact';

const login = new Login('.form-login');
const createAcc = new CreateAcc('.form-createAcc');
const createContact = new CreateContact('.form-contact');
const editContact = new EditContact('.form-editContact');

login.init();
createAcc.init();
createContact.init();
editContact.init();