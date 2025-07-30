
const RolMenusOperaciones = require('../../models').rol_menus_operaciones ; 
const sequelize = RolMenusOperaciones.sequelize;
module.exports = {
    list(req, res) {
return RolMenusOperaciones
            .findAll({})
            .then(( rolMenusOperaciones ) => res.status(200).send(rolMenusOperaciones )) 
            .catch((error) => { res.status(400).send(error); });
    },

    listModulosOperaciones(req, res) {
      return sequelize.query(`
          
        
      SELECT 
      ROW_NUMBER() OVER (ORDER BY  	mo.modulo, operaciones_sigla  ASC) AS fila,
      mo.modulo,r_m_o.estado, 
     r_m_o.operaciones_sigla || ' / ' ||mo.descripcion  AS modulo_operacion_concat
     FROM  
       roles r
       INNER JOIN rol_menus_operaciones r_m_o ON r.sigla  = r_m_o.roles_sigla  
       INNER JOIN menus men ON r_m_o.menus_sigla  = men.sigla 
       INNER JOIN operaciones ope ON r_m_o.operaciones_sigla = ope.sigla 
       INNER JOIN modulos mo ON men.modulos_sigla  = mo.sigla               
     WHERE   menus_sigla != 'M_ROOT'
   GROUP BY  modulo,r_m_o.operaciones_sigla,r_m_o.estado, mo.descripcion --, r_m_o.estado, r_m_o.roles_sigla,  r.rol,r.nivel_geografico_sigla,depto.descripcion ,r.estado  ,  mo.modulo--,men.sigla
 
        `, {          
              type: sequelize.QueryTypes.SELECT,
              plain: false,
              raw: true
        })
            .then((modulosOperaciones) => res.status(200).send(modulosOperaciones))
            .catch((error) => { res.status(400).send(error); });
    },

    
    getById(req, res) {
        console.log(req.params.id);
return RolMenusOperaciones
            .findByPk(req.params.id)
            .then( rolMenusOperaciones => { 
                console.log( rolMenusOperaciones);
                if (! rolMenusOperaciones) { 
        return res.status(404).send({
                        message: 'RolMenusOperaciones no encontrado', 
                    });
                }
                 return res.status(200).send(rolMenusOperaciones);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return RolMenusOperaciones.create({

             roles_sigla: req.body.roles_sigla,
             menus_sigla: req.body.menus_sigla,
             operaciones_sigla: req.body.operaciones_sigla,
             descripcion: req.body.descripcion,
             estado: req.body.estado,
             transaccion: req.body.transaccion,
             usu_cre: req.body.usu_cre,
         //    fec_cre: req.body.fec_cre,
           //  usu_mod: req.body.usu_mod,
            // fec_mod: req.body.fec_mod,
           //  host_creacion: req.body.host_creacion,
            // host_modificacion: req.body.host_modificacion,
        

        })
            .then(( rolMenusOperaciones ) => res.status(201).send(rolMenusOperaciones )) 
   .catch(error => res.status(400).send(error));
      },
    
 update(req, res) {
    console.log(': req.params.id: ', req.params.id);
                 return RolMenusOperaciones.findByPk(req.params.id, {})
            .then( rolMenusOperaciones => { 
                if (! rolMenusOperaciones) { 
       return res.status(404).send({
                        message: 'RolMenusOperaciones no encontrado', 
              });
            }
return rolMenusOperaciones
   .update({

       roles_sigla: req.body.roles_sigla || rolMenusOperaciones.roles_sigla,
        menus_sigla: req.body.menus_sigla || rolMenusOperaciones.menus_sigla,
      operaciones_sigla: req.body.operaciones_sigla || rolMenusOperaciones.operaciones_sigla,
        descripcion: req.body.descripcion || rolMenusOperaciones.descripcion,
        estado: req.body.estado || rolMenusOperaciones.estado,
        transaccion: req.body.transaccion || rolMenusOperaciones.transaccion,
     //   usu_cre: req.body.usu_cre || rolMenusOperaciones.usu_cre,
       // fec_cre: req.body.fec_cre || rolMenusOperaciones.fec_cre,
        usu_mod: req.body.usu_mod || rolMenusOperaciones.usu_mod,
        fec_mod: req.body.fec_mod || rolMenusOperaciones.fec_mod,
     //   host_creacion: req.body.host_creacion || rolMenusOperaciones.host_creacion,
       // host_modificacion: req.body.host_modificacion || rolMenusOperaciones.host_modificacion,


 })
 .then(() =>{  
     console.log(' *************SI UPDATE OK');
                 return res.status(200).send(rolMenusOperaciones)   })
.catch(error => {
         console.log(' *************ERROR UPDATE 1', error);
         res.status(400).send(error)  });
   })
 .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
                 return RolMenusOperaciones.findByPk(req.params.id)
            .then( rolMenusOperaciones => { 
                if (! rolMenusOperaciones) { 
       return res.status(404).send({
                        message: 'RolMenusOperaciones no encontrado', 
              });
            }
      return rolMenusOperaciones
      .destroy()
      .then(() =>{
        console.log(' ************SI DELETE OK');
          res.status(204).send() }  )
       .catch(error => res.status(400).send(error));
      })
     .catch(error => res.status(400).send(error));
  }

};




