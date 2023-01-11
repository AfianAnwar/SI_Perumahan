const berita = require("../models/beritamodel.js");

async function getberita (req, res) {
    try {
        const response = await berita.findAll();
        res.render('berita', {
            berita : response
        })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

async function getberita2 (req, res) {
    try {
        const response = await berita.findAll();
        res.render('dashboard', {
            berita : response
        })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

async function createberita(req, res) {
    const {judul, keterangan, gambar} = req.body;
    try {
        await berita.create({
            judul: judul,
            keterangan: keterangan,
            gambar: gambar,
        });
        res.redirect('/berita')
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error.message});
    }
}

async function editberitaview (req, res) {
    const { id } = req.params;
    const Berita = await berita.findOne({
        where: {
            id:id
        }
    });
    res.render('form_editberita', { berita : Berita});
}

async function editberita (req, res) {
    const { id } = req.params;
    const {judul, keterangan, gambar} = req.body;
    const Berita = await berita.findOne({
        where:{
            id: id
        }
    })
    Berita.judul = judul
    Berita.keterangan = keterangan
    Berita.gambar = gambar
    await Berita.save();
    res.redirect('/berita')
}

async function deleteberita (req, res) {
    const { id } = req.params;
    await berita.destroy({
        where:{
            id: id
        }
    });
    res.redirect('/berita')
}

module.exports = {
    getberita,
    getberita2,
    createberita,
    editberita,
    editberitaview,
    deleteberita
}