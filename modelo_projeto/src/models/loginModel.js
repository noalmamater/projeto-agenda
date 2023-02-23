const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.valida();
        if(this.errors.length > 0) return;
        
        this.user = await LoginModel.findOne({email: this.body.email});
        if(!this.user) {
            this.errors.push('E-mail não cadastrado');
            return;
        }
        if(!bcrypt.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }
    }

    async register() {
        this.valida();
        if(!this.body.name) {
            this.errors.push('É necessário fornecer seu nome');
        }
        if(this.errors.length > 0) return;

        await this.userExists();
        if(this.errors.length > 0) return;
 
        const salt = bcrypt.genSaltSync();
        this.body.password = bcrypt.hashSync(this.body.password, salt);
        this.user = await LoginModel.create(this.body);
       
    }

    async userExists() {
        const user = await LoginModel.findOne({email: this.body.email});
        if(user) this.errors.push('Usuário já cadastrado');
    }

    valida() {
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido');
        };
        if(this.body.password.length < 6 || this.body.password.length > 40) {
            this.errors.push('A senha deve ter no mínimo 6 caracteres');
        };
    }

    cleanUp() {
        for(let key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            name: this.body.name,
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Login;