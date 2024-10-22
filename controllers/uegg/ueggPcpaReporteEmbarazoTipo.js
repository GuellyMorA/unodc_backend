const UeggPcpaConstruccion = require('../../models/uegg').uegg_pcpa_construccion ; 

module.exports = {                                                                                                                                                                                                                                                                                                                                                                                                                             
    list(req, res) {
        return UeggPcpaConstruccion
            .findAll({})
            .then((ueggPcpaConstruccion) => res.status(200).send(ueggPcpaConstruccion)) 
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id); 
        return UeggPcpaConstruccion
            .findByPk(req.params.id)
            .then((ueggPcpaConstruccion) => { 
                console.log(ueggPcpaConstruccion);
                if (!ueggPcpaConstruccion) {
                    return res.status(404).send({
                        message: 'UeggPcpaConstruccion no encontrado',
                    });
                }
                return res.status(200).send(ueggPcpaConstruccion); 
            })
            .catch((error) => res.status(400).send(error));
    },

};