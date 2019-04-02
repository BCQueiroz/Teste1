const express = require('express');
const router = express.Router();
const Motorista = require('../Model/Motorista');

router.post('/cadastrarMotorista', async (req,res) => {
    const {nm_Motorista, dt_NascMotorista, cd_CpfMotorista, ds_ModeloCarro, ic_IsAtivo, ds_Sexo} = req.body;
    if(!nm_Motorista || !dt_NascMotorista || !cd_CpfMotorista || !ds_ModeloCarro || !ic_IsAtivo || !ds_Sexo) return res.status(400).send({ error: 'Dados insuficientes'});
    
    try{
        if(await Motorista.findOne({ cd_CpfMotorista })) return res.status(400).send({error: 'Motorista ja existe.'});    
        const user = await Motorista.create(req.body);
        return res.status(201).send(user);
    }
    catch(err){
        return res.status(500).send({error: 'Erro ao registrar motorista.'});
    }
})

router.get('/listarMotorista', async (req,res) => {
    try{
        const motoristas = await Motorista.find({});
        return res.send(motoristas);
    }
    catch(err){
        return res.status(500).send({error: 'Erro na listagem de motoristas.'});
    }
})

router.put('/atualizarMotorista', async (req,res) => {
    const { nm_Motorista, dt_NascMotorista, cd_CpfMotorista, ds_ModeloCarro, ic_IsAtivo, ds_Sexo } = req.body;
    if(!nm_Motorista || !dt_NascMotorista || !cd_CpfMotorista || !ds_ModeloCarro || !ic_IsAtivo || !ds_Sexo) return res.status(400).send({error: 'Dados insuficientes!'});
    
    try{
       await Motorista.findOneAndUpdate({cd_CpfMotorista}, req.body, {new : true}, (err,resp) =>{
            if(err) return res.status(400).send({error: 'Erro ao atualizar.'});
            return res.send(resp); 
       })
    }
    catch(err){
        return res.status(500).send({error: 'Erro ao atualizar motorista.'});
    }

})

router.delete('/deletarMotorista', async (req,res) => {
    const {cd_CpfMotorista} = req.body;
    if(!cd_CpfMotorista) return res.status(400).send({error: 'CPF não informado.'});

    try{
        await Motorista.findOneAndDelete({cd_CpfMotorista},(err,resp) => {
            if(err) return res.status(400).send({error: 'Erro ao excluir registro do motorista.'});
            return res.send(resp);
        })
    }
    catch(err){
        return res.status(500).send({error: 'Erro ao remover motorista.'});
    }
})
module.exports = router;
