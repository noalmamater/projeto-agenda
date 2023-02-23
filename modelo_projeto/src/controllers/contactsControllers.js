const Contact = require('../models/contactsModel');

exports.index = (req, res) => {
    res.render('contato');
};

exports.register = async (req, res) => {
    const contact = new Contact(req.body);
    try {
        await contact.register();
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => {
                return res.redirect('back');
            });
            return;
        }
        req.flash('success', 'Contato adicionado!');
        req.session.save(() => {
            return res.redirect(`/`); //`/contato/index/${contact.contact._id}`
        });

    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404');
    const contact = new Contact(req.body);
    try {
        const improvise = await contact.searchId(req.params.id);
        if(!improvise) return res.render('404');

        res.render('contatoEdicao', {improvise});
    } catch(e) {
        console.log(e);
    }
};

exports.edit = async (req, res) => {
    if (!req.params.id) return res.render('404');
    const contact = new Contact(req.body);
    try {
        await contact.edit(req.params.id);
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => {
                return res.redirect('back');
            });
            return;
        }
        req.flash('success', 'O contato foi atualizado');
        req.session.save(() => {
            return res.redirect(`/`);
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('404');
    const contact = new Contact(req.body);
    try {
        const deleteContact = await contact.delete(req.params.id);
        if(!deleteContact) return res.render('404');

        req.flash('success', 'O contato apagado');
        req.session.save(() => res.redirect(`back`));
        return;
    } catch(e) {
        console.log(e);
        res.render('404');
    }
};