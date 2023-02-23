import validator from "validator";

export default class CreateContact {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    };

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    };

    validate(e) {
        const el = e.target;
        const nameInput = el.querySelector('input[name="name"]');
        const telInput = el.querySelector('input[name="telephone"]');
        const emailInput = el.querySelector('input[name="email"]');
        let errors = false;
        for(let errMsg of this.form.querySelectorAll('.err-msg')) {
            errMsg.remove();
        }

        if(!nameInput.value) {
            this.createAlert('.contact-name', 'É necessário fornecer um nome');
            errors = true;
        }

        if(emailInput && !validator.isEmail(emailInput.value)) {
            this.createAlert('.contact-email', 'E-mail inválido');
            emailInput.classList.remove('mb-3');
            emailInput.classList.add('mb-2');
            errors = true;
        }

        if(!telInput.value && !emailInput.value) {
            this.createAlert('.contact-email', 'É necessário enviar um telefone ou um E-mail');
            emailInput.classList.remove('mb-3');
            emailInput.classList.add('mb-2');
            errors = true;
        }

        if(!errors) el.submit();
    };

    createAlert(motherDivClass, alertText) {
        const div = document.createElement('div');
        div.classList.add('alert', 'alert-danger', 'err-msg');
        div.innerText = alertText;
        document.querySelector(motherDivClass).appendChild(div);
    };
}