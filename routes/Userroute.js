const express = require("express");
const {
    getUsers,
    createUser,
    edituser,
    edituserview,
    edituser1,
    edituserview1,
    deleteUser
} = require("../controllers/Usercontrollers.js");

const {
    getberita,
    getberita2,
    createberita,
    editberita,
    editberitaview,
    deleteberita
} = require("../controllers/beritacontrollers.js");

const {
    getbayar,
    getbayaradmin,
    createbayar,
    editbayar,
    editbayarview,
    deletebayar
} = require("../controllers/pembayarancontrollers.js");

const passport = require('passport')

const router = express.Router();

router.get ('/users', getUsers);
router.get ('/users/edit/:id', edituserview);
router.get ('/users1/edit/', edituserview1);
router.get ('/users/delete/:id', deleteUser);

router.get ('/berita', getberita);
router.get ('/berita/edit/:id', editberitaview);
router.get ('/berita/delete/:id', deleteberita);
router.get ('/dashboard', getberita2);

router.get ('/pembayarandetail', getbayar);
router.get ('/transaksi', getbayaradmin);
router.get ('/transaksi/edit/:id', editbayarview);
router.get ('/transaksi/delete/:id', deletebayar);

router.post ('/pembayarandetail', createbayar);
router.post ('/transaksi/edit/:id', editbayar);

router.post ('/users', createUser);
router.post ('/users/edit/:id', edituser);
router.post ('/users1/edit/', edituser1);
router.post ('/berita/edit/:id', editberita);
router.post ('/berita', createberita);

router.get('/tambah-user', (req,res) => {
    res.render('form_tambahUser')
})
router.get('/tambah-berita', (req,res) => {
    res.render('form_tambahberita')
})

router.post('/login', passport.authenticate('local', {
    successRedirect : '/dashboard',
    failureRedirect : '/'
}));

router.get('/', (req, res) => {
    res.render('login.ejs', {
        user : req.user
    });
});

router.get('/alogin', (req, res) => {
    res.render('alogin')
})

router.get('/transaksi', (req, res) => {
    res.render('transaksi')
})

router.get('/form_updateberita', (req, res) => {
    res.render('form_updateberita')
})

router.get('/form_pembayaran', (req, res) => {
    res.render('form_pembayaran')
})

router.get('/profil', (req, res) => {
    res.render('profil')
})

router.get('/form_updateprofil', (req, res) => {
    res.render('form_updateprofil')
})

router.get ('/berita', (req, res) => {
    res.render('berita.ejs', {
        user : req.user
    });
})


router.get ('/logout', (req, res, next) => {
    req.logout( e => {
        next(e)
    })
    res.redirect('/')
})

module.exports = router;