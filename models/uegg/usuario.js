'use strict';

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('usuario', {
        persona_id: DataTypes.INTEGER,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        fecha_registro: DataTypes.DATE,
        password2: DataTypes.STRING,
        esactivo: DataTypes.BOOLEAN,
        estadopassword: DataTypes.INTEGER
    }, {
        tableName: 'usuario',
        timestamps: false,
    });

    Usuario.associate = function(models) {
        /*Usuario.belongsTo(models.persona, {
            foreignKey: 'persona_id'
        });*/
    };
    return Usuario;
};