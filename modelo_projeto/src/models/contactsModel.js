const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    telephone: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
});

const contactModel = mongoose.model('contact', contactSchema);

class Contact {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contact = null;
    }

    async delete(id) {  	
        try{
            if(typeof id !== 'string') return;
            const contact = await contactModel.findOneAndDelete({_id: id});
            return contact;
        } catch (e) {
            console.log(e);
        }
    };

    async searchId(id) {
        try {
            if (typeof id !== 'string') return;
            const contact = await contactModel.findById(id);
            return contact;
        } catch (e) {
            console.log(e);
        }
    };

    async register() {
        try {
            this.valida();
            if (this.errors.length > 0) return;
            this.contact = await contactModel.create(this.body);
        } catch (e) {
            console.log(e);
        }

    };

    valida() {
        this.cleanUp();
        if (!this.body.name) {
            this.errors.push('É necessário fornecer um nome');
        }
        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido');
        }
        if (!this.body.email && !this.body.telephone) {
            this.errors.push('É necessário enviar um telefone ou um E-mail');
        }
    };

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            name: this.body.name,
            telephone: this.body.telephone,
            email: this.body.email
        };
    };

    async edit(id) {
        try {
            if (typeof id !== 'string') return;
            this.valida();
            if (this.errors.length > 0) return;
            this.contact = await contactModel.findByIdAndUpdate(id, this.body, { new: true });
        } catch(e) {
            console.log(e);
        }
    };

    async searchContacts() {
        try {
            const contacts = await contactModel.find()
                .sort({ criadoEm: -1 });
            return contacts;
        } catch (e) {
            console.log(e);
        }
    };
}

module.exports = Contact;
