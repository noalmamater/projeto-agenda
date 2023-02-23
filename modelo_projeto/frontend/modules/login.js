import validator from "validator";

export default class Login {
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
        })
    };

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let errors = false;
        for (let errMsg of this.form.querySelectorAll('.err-msg')) {
            errMsg.remove();
        };

        if(!validator.isEmail(emailInput.value)) {
            this.createAlert('.login-email', 'E-mail inválido');
            emailInput.classList.remove('mb-4');
            emailInput.classList.add('mb-2');
            errors = true;
        };

        if(passwordInput.value.length < 6 || passwordInput.value.length > 40) {
            this.createAlert('.login-password', 'A senha deve ter no mínimo 6 caracteres');
            errors = true;
        };

        if(!errors) el.submit();
    };
    
    createAlert(motherDivClass, alertText) {
        const div = document.createElement('div');
        div.classList.add('alert', 'alert-danger', 'err-msg');
        div.innerText = alertText;
        document.querySelector(motherDivClass).appendChild(div);
    };
}