const Contact = require('../models/contactsModel');

exports.index = async (req, res) => {
    try{
        const contacts = new Contact(req.body);
        const showContacts = await contacts.searchContacts();
        res.render('index', {showContacts});
    } catch (e) {
        console.log(e);
    }
};
