
const Roles = require('../../models').roles ; 
const sequelize = Roles.sequelize;
module.exports = {

    list(req, res) {
        return sequelize.query(`
        SELECT
        ROW_NUMBER() OVER (ORDER BY  	  rol_agg.roles_sigla  ASC) AS fila,
          rol_agg.roles_sigla, rol_agg.operaciones_sigla ,rol_agg.rol,rol_agg.nivel_geografico_sigla,rol_agg.departamento ,rol_agg.rol_estado ,
          STRING_AGG(rol_agg.operaciones_concatenadas, ' - ') AS operaciones_concat
          , STRING_AGG(rol_agg.operaciones_concatenadas ||' ('|| rol_agg.estado|| ')', ' - ') AS operaciones_concat_estado
            , STRING_AGG(rol_agg.operaciones_sigla_concat, ' + ') AS operaciones_sigla_concat
      FROM (        
           SELECT 
           r_m_o.menus_sigla,r_m_o.estado, r_m_o.roles_sigla, r.rol,r.nivel_geografico_sigla, r.estado AS rol_estado ,(r_m_o.operaciones_sigla) AS operaciones_sigla,
             --  STRING_AGG(men.modulos_sigla, ', ') AS modulos_concatenadas,
          (mo.modulo) || ': ' || STRING_AGG(r_m_o.operaciones_sigla, ', ') AS operaciones_concatenadas,
          STRING_AGG(r_m_o.id    ||'-' || men.sigla ||'-' || r_m_o.operaciones_sigla ||'-'  || (mo.modulo)||': ' || r_m_o.operaciones_sigla ||' ('|| r_m_o.estado|| ')' , '+ ') AS operaciones_sigla_concat
                  ,depto.descripcion AS departamento  --, men.sigla AS menus_sigla
           FROM  --  (r_m_o.estado) || ': ' || 
             roles r
             INNER JOIN rol_menus_operaciones r_m_o ON r.sigla  = r_m_o.roles_sigla  
             INNER JOIN menus men ON r_m_o.menus_sigla  = men.sigla 
             INNER JOIN operaciones ope ON r_m_o.operaciones_sigla = ope.sigla 
             INNER JOIN nivel_geografico depto ON r.nivel_geografico_sigla  = depto.sigla  
             INNER JOIN modulos mo ON men.modulos_sigla  = mo.sigla           
          WHERE   menus_sigla != 'M_ROOT'
          GROUP BY  r_m_o.menus_sigla,r_m_o.operaciones_sigla, r_m_o.estado, r_m_o.roles_sigla,  r.rol,r.nivel_geografico_sigla,depto.descripcion ,r.estado  ,  mo.modulo--,men.sigla
          ORDER BY r_m_o.roles_sigla, operaciones_sigla
      )  AS rol_agg
       GROUP BY  rol_agg.roles_sigla, rol_agg.rol,rol_agg.operaciones_sigla, rol_agg.nivel_geografico_sigla, rol_agg.departamento,rol_agg.rol_estado--, rol_agg.menus_sigla
     
      
         `,
          {
            type: sequelize.QueryTypes.SELECT, plain: false, 
            raw: true
          })
          .then((subcentros) => res.status(200).send(subcentros))
          .catch((error) => { 
            res.status(400).send(error); });
      },

      listActivos(req, res) {
        return sequelize.query(`
        SELECT
        r.id AS rol_id ,  r.sigla  AS roles_sigla, r.rol
                FROM 
                    roles r   
                WHERE r.estado ='ACTIVO'  
                ORDER BY 	r.sigla  ASC
      
         `,
          {
            type: sequelize.QueryTypes.SELECT, plain: false, 
            raw: true
          })
          .then((subcentros) => res.status(200).send(subcentros))
          .catch((error) => { 
            res.status(400).send(error); });
      },




    getById(req, res) {
        console.log(req.params.id);
      return Roles
            .findByPk(req.params.id)
            .then( roles => { 
                console.log( roles);
                if (! roles) { 
        return res.status(404).send({
                        message: 'Roles no encontrado', 
                    });
                }
                 return res.status(200).send(roles);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return Roles.create({

             sigla: req.body.sigla,
             rol: req.body.rol,
             descripcion: req.body.descripcion,
             nivel_geografico_sigla: req.body.nivel_geografico_sigla,
             modulo_sigla: req.body.modulo_sigla,
             estado: req.body.estado,
             transaccion: req.body.transaccion,
             usu_cre: req.body.usu_cre,
             fec_cre: req.body.fec_cre,
             usu_mod: req.body.usu_mod,
             fec_mod: req.body.fec_mod,
             host_creacion: req.body.host_creacion,
             host_modificacion: req.body.host_modificacion,



        })
            .then(( roles ) => res.status(201).send(roles )) 
   .catch(error => res.status(400).send(error));
      },
    
 update(req, res) {
        console.log( Roles);
                 return Roles.findByPk(req.params.id, {})
            .then( roles => { 
                if (! roles) { 
       return res.status(404).send({
                        message: 'Roles no encontrado', 
              });
            }
return roles
   .update({

        sigla: req.body.sigla || roles.sigla,
        rol: req.body.rol || roles.rol,
        descripcion: req.body.descripcion || roles.descripcion,
        nivel_geografico_sigla: req.body.nivel_geografico_sigla || roles.nivel_geografico_sigla,
        modulo_sigla: req.body.modulo_sigla || roles.modulo_sigla,
        estado: req.body.estado || roles.estado,
        transaccion: req.body.transaccion || roles.transaccion,
        usu_cre: req.body.usu_cre || roles.usu_cre,
        fec_cre: req.body.fec_cre || roles.fec_cre,
        usu_mod: req.body.usu_mod || roles.usu_mod,
        fec_mod: req.body.fec_mod || roles.fec_mod,
        host_creacion: req.body.host_creacion || roles.host_creacion,
        host_modificacion: req.body.host_modificacion || roles.host_modificacion,
















 })
 .then(() =>{  
     console.log(' *************SI UPDATE OK');
                 return res.status(200).send(roles)   })
.catch(error => {
         console.log(' *************ERROR UPDATE 1', error);
         res.status(400).send(error)  });
   })
 .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
                 return Roles.findByPk(req.params.id)
            .then( roles => { 
                if (! roles) { 
       return res.status(404).send({
                        message: 'Roles no encontrado', 
              });
            }
      return roles
      .destroy()
      .then(() =>{
        console.log(' ************SI DELETE OK');
          res.status(204).send() }  )
       .catch(error => res.status(400).send(error));
      })
     .catch(error => res.status(400).send(error));
  }

};




