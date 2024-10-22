const UeggViolenciaAgresor = require('../../models/uegg').uegg_violencia_agresor ; 
const sequelize = UeggViolenciaAgresor.sequelize; // MODIFICADO 20241001

module.exports = {
    list(req, res) {
        return UeggViolenciaAgresor
            .findAll({})
            .then((UeggViolenciaAgresor) => res.status(200).send(UeggViolenciaAgresor)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return UeggViolenciaAgresor
            .findByPk(req.params.id)
            .then((UeggViolenciaAgresor) => { 
                console.log(UeggViolenciaAgresor);
                if (!UeggViolenciaAgresor) {
                    return res.status(404).send({
                        message: 'UeggViolenciaAgresor no encontrado',
                    });
                }
                return res.status(200).send(UeggViolenciaAgresor);
            })
            .catch((error) => res.status(400).send(error));
    },



    add(req, res) {
        return UeggViolenciaAgresor.create({
          id_violencia_caso_agresor: req.body.id_violencia_caso_agresor,
          cod_rda: req.body.cod_rda,
          num_ci: req.body.num_ci,
          num_comp: req.body.num_comp,
          apellido_pat_agresor: req.body.apellido_pat_agresor,
          apellido_mat_agresor: req.body.apellido_mat_agresor,
          nombres_agresor: req.body.nombres_agresor,
          fec_nac: req.body.fec_nac,
          sexo: req.body.sexo,
          genero: req.body.genero,
          cargo_ocupa: req.body.cargo_ocupa,
          nivel: req.body.nivel,
          dir_actual: req.body.dir_actual,
          celular_contacto: req.body.celular_contacto,
          correo_electronico: req.body.correo_electronico,
           
            estado: 'ACTIVO' ,
            usu_cre: req.body.usu_cre ,
            fec_cre: req.body.fec_cre 
          
        })
          .then(UeggViolenciaAgresor => res.status(201).send(UeggViolenciaAgresor))
          .catch(error => res.status(400).send(error));
      },
    
      update(req, res) {
        console.log(UeggViolenciaAgresor);
        return UeggViolenciaAgresor.findByPk(req.params.Id, {})
          .then(UeggViolenciaAgresor => {
            if (!UeggViolenciaAgresor) {
              return res.status(404).send({
                message: "UeggViolenciaAgresor Not Found"
              });
            }
            return UeggViolenciaAgresor
              .update({
                id_violencia_caso_agresor: req.body.id_violencia_caso_agresor || UeggViolenciaAgresor.id_violencia_caso_agresor,
                cod_rda: req.body.cod_rda || UeggViolenciaAgresor.cod_rda,
                num_ci: req.body.num_ci || UeggViolenciaAgresor.num_ci, 
                num_comp: req.body.num_comp || UeggViolenciaAgresor.num_comp,
                apellido_pat_agresor: req.body.apellido_pat_agresor || UeggViolenciaAgresor.apellido_pat_agresor,
                apellido_mat_agresor: req.body.apellido_mat_agresor || UeggViolenciaAgresor.apellido_mat_agresor,
                nombres_agresor: req.body.nombres_agresor || UeggViolenciaAgresor.nombres_agresor,
                fec_nac: req.body.fec_nac || UeggViolenciaAgresor.fec_nac,
                sexo: req.body.sexo || UeggViolenciaAgresor.sexo,
                genero: req.body.genero || UeggViolenciaAgresor.genero,
                cargo_ocupa: req.body.cargo_ocupa || UeggViolenciaAgresor.cargo_ocupa,
                nivel: req.body.nivel || UeggViolenciaAgresor.nivel,
                dir_actual: req.body.dir_actual || UeggViolenciaAgresor.dir_actual,
                celular_contacto: req.body.celular_contacto || UeggViolenciaAgresor.celular_contacto,
                correo_electronico: req.body.correo_electronico || UeggViolenciaAgresor.correo_electronico,
                estado: 'MODIFICADO',  
                usu_mod: req.body.usu_mod ,
                fec_mod: req.body.fec_mod
              })
              .then(() =>{  
                 console.log(' *************SI UPDATE OK');
                 res.status(200).send(UeggViolenciaAgresor)   })
              .catch(error => {
                console.log(' *************ERROR UPDATE 1', error);
                res.status(400).send(error)  });
          })
          .catch(error => {
            console.log(' *************ERROR UPDATE 2',  error);
            res.status(400).send(error)  });
      },
    
      delete(req, res) {
        return UeggViolenciaAgresor.findByPk(req.params.Id)
          .then(UeggViolenciaAgresor => {
            if (!UeggViolenciaAgresor) {
              return res.status(400).send({
                message: "UeggViolenciaAgresor Not Found"
              });
            }
            return UeggViolenciaAgresor
              .destroy()
              .then(() =>{
                console.log(' ************SI DELETE OK');
                 res.status(204).send() }  )
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },
    
    
      getByRude(req, res) {
        console.log('req', req.params, `select * from public.uegg_violencia_agresor where cod_rda = '${req.params.rude}' `);
        return sequelize.query(`select * from public.uegg_violencia_agresor where cod_rda = '${req.params.rude}' `, {
            type: sequelize.QueryTypes.SELECT, plain: false, raw: true 
          })
            .then((subcentros) => res.status(200).send(subcentros))
            .catch((error) => { res.status(400).send(error); });
      },
    
      getByRda(req, res) {
        console.log('req', req.params, `select * from public.uegg_violencia_agresor where cod_rda = '${req.params.rda}' `);
        return sequelize.query(`select * from public.uegg_violencia_agresor where cod_rda = '${req.params.rda}' `, {
            type: sequelize.QueryTypes.SELECT, plain: false, raw: true 
          })
            .then((subcentros) => res.status(200).send(subcentros))
            .catch((error) => { res.status(400).send(error); });
      }



};