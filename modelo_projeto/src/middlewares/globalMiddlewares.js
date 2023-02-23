/* podemos fazer a injeção de res.locals em middlewares globais caso
sejam necessários em várias rotas */
exports.globalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Faça login para acessar seus contatos');
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
}