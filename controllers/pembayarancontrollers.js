const Pembayaran = require("../models/pembayaranmodel.js");
const path = require('path');
const fileUpload = require("express-fileupload");


async function getbayar (req, res) {
    try {
        const response = await Pembayaran.findAll({
            where: {
                user_id: req.user.id
            }
        });
        res.render('pembayarandetail', {
            pembayaran : response
        });
    } catch (error) {
        console.log(error.message);
    }
}

async function getbayaradmin (req, res) {
    try {
        const response = await Pembayaran.findAll();
        res.render('transaksi', {
            pembayaran : response
        });
    } catch (error) {
        console.log(error.message);
    }
}

async function createbayar(req, res) {
    fileUpload()
    const name = req.body.title;
    const tanggal = req.body.tanggal;
    const keterangan = req.body.keterangan;
    const status = req.body.status;
    
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];


    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if (fileSize > 10000000) return res.status(422).json({msg: "Images must be less than 10 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if (err) return res.status(500).json({msg: err.message});
        try {
            await Pembayaran.create({
                name: name,
                tanggal: tanggal,
                keterangan: keterangan,
                image: fileName,
                url: url,
                status: status,
                user_id : req.user.id
            });
            res.redirect('/pembayarandetail')
        } catch (error) {
            console.log(error.message)
        }
    })
}

async function editbayarview (req, res) {
    const { id } = req.params;
    const pembayaran = await Pembayaran.findOne({
        where: {
            id:id
        }
    });
    res.render('form_editbayar', { pembayaran : pembayaran});
}

async function editbayar (req, res) {
    const { id } = req.params;
    const {status} = req.body;
    const pembayaran = await Pembayaran.findOne({
        where:{
            id: id
        }
    })
    pembayaran.status = status
    await pembayaran.save();
    res.redirect('/transaksi')
}

async function deletebayar (req, res) {
    const { id } = req.params;
    await Pembayaran.destroy({
        where:{
            id: id
        }
    });
    res.redirect('/transaksi')
}

module.exports = {
    getbayar,
    getbayaradmin,
    editbayar,
    editbayarview,
    createbayar,
    deletebayar
}