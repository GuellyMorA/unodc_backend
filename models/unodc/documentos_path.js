'use strict';	
	
module.exports = (sequelize, DataTypes) => {	
const DocumentosPath = sequelize.define('documentos_path' ,{  	
    id: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true,
	    field: 'id'
	    },
	
	
	denuncia_personas_id: DataTypes.INTEGER, 
	usuarios_id: DataTypes.INTEGER, 
	seguimiento_id: DataTypes.INTEGER, 
	denunciante_id: DataTypes.INTEGER, 
	orden: DataTypes.INTEGER, 
	origen: DataTypes.STRING, 
	documento_path: DataTypes.STRING, 
	descripcion: DataTypes.STRING, 
	justificacion_legal: DataTypes.STRING, 
	fec_registro: DataTypes.DATE, 
	estado: DataTypes.STRING, 
	transaccion: DataTypes.STRING, 
	usu_cre: DataTypes.STRING, 
	fec_cre: DataTypes.DATE, 
	usu_mod: DataTypes.STRING, 
	fec_mod: DataTypes.DATE, 
	host_creacion: DataTypes.STRING, 
	host_modificacion: DataTypes.STRING, 
	
    }, {	
    tableName: 'documentos_path'  ,	
    timestamps: false,	
    });	
	
/*	
DocumentosPath.associate = function(models) { 	
    DocumentosPath.belongsTo(models.actividades, {	
        foreignKey: 'actividades_id'	
    });	
	
};

DocumentosPath.associate = function(models) { 	
    DocumentosPath.belongsTo(models.denuncia_personas, {	
        foreignKey: 'denuncia_personas_id'	
    });	
	
};

DocumentosPath.associate = function(models) { 	
    DocumentosPath.belongsTo(models.usuarios, {	
        foreignKey: 'usuarios_id'	
    });	
	
};
*/
return DocumentosPath;	
};