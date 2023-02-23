const Login = require('../models/loginModel');

exports.index = ((req, res) => {
    if (req.session.user) return res.render('login-loggedin');
    res.render('login');
});

exports.register = async (req, res) => {
    const login = new Login(req.body);
    try {
        await login.register();
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Seu usuário foi criado com sucesso');
        req.session.save(() => {
            return res.redirect('back');
        });

    } catch (e) {
        console.log(e);
        return res.render('404');
    };
};

exports.login = async (req, res) => {
    const login = new Login(req.body);
    try {
        await login.login();
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', `Login efetuado com sucesso!`);
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect('back');
        });

    } catch (e) {
        console.log(e);
        return res.render('404');
    };
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login/index');
};