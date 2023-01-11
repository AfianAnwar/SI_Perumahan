const Users = require("../models/Usermodel.js");
const argon2 = require('argon2')

async function getUsers (req, res) {
    try {
        const response = await Users.findAll();
        res.render('dataUser', {
            user : response
        })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

async function createUser(req, res) {
    const {name, username, password, role} = req.body;
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            username: username,
            password: hashPassword,
            role: role,
        });
        res.redirect('/users')
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error.message});
    }
}

async function edituserview (req, res) {
    const { id } = req.params;
    const user = await Users.findOne({
        where: {
            id:id
        }
    });
    res.render('form_edituser', {title: 'Edit User', user : user});
}

async function edituser (req, res) {
    const { id } = req.params;
    const {name, username, password, role} = req.body;
    const hashpassword = await argon2.hash(password);
    const user = await Users.findOne({
        where:{
            id: id
        }
    })
    user.name = name
    user.username = username
    user.password = hashpassword
    user.role = role
    await user.save();
    res.redirect('/users')
}

async function edituserview1 (req, res) {
   
    res.render('form_updateprofil');
}

async function edituser1 (req, res) {
    const {id ,name, username, password, role} = req.body;
    const hashpassword = await argon2.hash(password);
    const user = await Users.findOne({
        where:{
            id: id
        }
    })
    user.name = name
    user.username = username
    user.password = hashpassword
    await user.save();
    res.redirect('/profil')
}

async function deleteUser (req, res) {
    const { id } = req.params;
    const user = await Users.findOne({
        where:{
            id: id
        }
    })
    await user.destroy();
    res.redirect('/users')
}

module.exports = {
    getUsers,
    createUser,
    edituser,
    edituserview,
    edituser1,
    edituserview1,
    deleteUser
}