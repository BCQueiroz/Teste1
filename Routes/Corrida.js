const express = require('express');
const router = express.Router();
const Corrida = require('../Model/Corrida');
const Motorista = require('../Model/Motorista');
const Passageiro = require('../Model/Passageiro');

router.post('/criarCorrida', async (req,res) => {
    const {cd_CpfMotorista, cd_CpfPassageiro, vl_Corrida} = req.body;
    if(!cd_CpfMotorista || !cd_CpfPassageiro || !vl_Corrida) return  res.status(400).send({error: 'Dados insuficientes.'});
    
    try{
        const mot = await Motorista.findOne({ cd_CpfMotorista });
        if(!mot) return res.status(400).send({error: 'CPF do Motorista não cadastrado.'});
        
        const pas = await Passageiro.findOne({ cd_CpfPassageiro })
        if(!pas) return res.status(400).send({error: 'CPF do Passageiro não cadastrado.'});
            
        if(mot.ic_IsAtivo) await res.send('Viagem aprovada.')
        else await res.send('Motorista está de ferias.');

        const user = await Corrida.create(req.body);  
        return res.send(user);  
        
    }
    catch(err){
        return res.status(500).send({error: 'Erro ao realizar tarefa no banco de dados.'})
    }
})


router.get('/listarCorridas', async (req,res) =>{
    try{
        const corridas = await Corrida.find({});
        return res.send(corridas);
    }catch{
        return res.status(500).send({error: 'Erro ao listar corridas.'});
    }
})
module.exports = router;