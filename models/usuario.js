'use strict';

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('usuarios', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },

        nombres: DataTypes.STRING,
        apellido_pat: DataTypes.STRING,
        apellido_mat: DataTypes.STRING,
        user_login: DataTypes.STRING,
        password_hash: DataTypes.STRING,
        fec_cre: DataTypes.DATE,
        
        estado: DataTypes.BOOLEAN,
        reset_key: DataTypes.INTEGER
    }, {
        tableName: 'usuarios',
        timestamps: false,
    });


    return Usuario;
};