'use strict';

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('usuarios', {
 
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