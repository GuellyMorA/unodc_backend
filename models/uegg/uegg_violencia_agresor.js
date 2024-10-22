'use strict';
module.exports = (sequelize, DataTypes) => {
  const UeggViolenciaAgresor = sequelize.define('uegg_violencia_agresor', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    id_violencia_caso_agresor: DataTypes.INTEGER,
    cod_rda: DataTypes.INTEGER,
    num_ci: DataTypes.INTEGER,
    num_comp: DataTypes.STRING,
    apellido_pat_agresor: DataTypes.STRING,
    apellido_mat_agresor: DataTypes.STRING,
    nombres_agresor: DataTypes.STRING,
    fec_nac: DataTypes.DATE,
    sexo: DataTypes.STRING,
    genero: DataTypes.STRING,
    cargo_ocupa: DataTypes.STRING,
    nivel: DataTypes.STRING,
    dir_actual: DataTypes.STRING,
    celular_contacto: DataTypes.STRING,
    correo_electronico: DataTypes.STRING,
  
    estado: DataTypes.STRING,
    usu_cre: DataTypes.STRING,
    usu_mod: DataTypes.STRING,
    fec_cre: DataTypes.DATE,
    fec_mod: DataTypes.DATE
  },
    {tableName: 'uegg_violencia_agresor',       
    timestamps: false,     });   
    UeggViolenciaAgresor.associate = function(models) {      
  
  };
    return UeggViolenciaAgresor;
  };