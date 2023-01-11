const { Sequelize } = require('sequelize')
const db = require('../config/database');
const Users = require('./Usermodel');
const { DataTypes } = Sequelize;

const Pembayaran = db.define('pembayaran', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    tanggal:{
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    keterangan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    status:{
        type: DataTypes.STRING,
        allowNull: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
    
});

Pembayaran.belongsTo(Users, {foreignKey: 'user_id', as :'user'})

module.exports = Pembayaran