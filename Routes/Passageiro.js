const express = require('express');
const router = express.Router();
//const app = require('../app')
const Passageiro = require('../Model/Passageiro');

router.post('/Passageiro/cadastrarPassageiro', async (req,res) => {
    const {nm_Passageiro, dt_NascPassageiro, cd_CpfPassageiro, ds_SexoPassageiro} = req.body;
    if(!nm_Passageiro || !dt_NascPassageiro || !cd_CpfPassageiro | !ds_SexoPassageiro) return res.status(400).send({error: 'Dados insuficientes.'});
    try{
        if(await Passageiro.findOne({ cd_CpfPassageiro })) return res.status(400).send({error: 'Passageiro já existe no banco de dados.'});
        
        const user = await Passageiro.create(req.body);
        return res.status(201).send(user);
    }
    catch(err){
        return res.status(500).send({error: 'Erro ao registrar passageiro.'});
    }
})

router.get('/listarPassageiro', async (req,res) =>{
    try{
        const passageiros = await Passageiro.find({});
        return res.send(passageiros);
    }catch{
        return res.status(500).send({error: 'Erro ao listar passageiros.'});
    }
})

router.put('/atualizarPassageiro', async (req,res) => {
    const {nm_Passageiro, dt_NascPassageiro, cd_CpfPassageiro, ds_SexoPassageiro} = req.body;
    if(!nm_Passageiro || !dt_NascPassageiro || !cd_CpfPassageiro | !ds_SexoPassageiro) return res.status(400).send({error: 'Dados insuficientes.'});
    try{
        await Passageiro.findOneAndUpdate({cd_CpfPassageiro}, req.body, {new: true}, (err,resp) => {
            if(err) return res.status(400).send({ error : 'Erro ao atualizar o passageiro.'});
            return res.send(resp);
        })
    }
    catch(err){
            return res.status(500).send({error : 'Erro com a base de dados.'});
    }
})

router.delete('/deletarPassageiro', async (req,res) => {
    const {cd_CpfPassageiro} = req.body;
    if(!cd_CpfPassageiro) return res.status(400).send({error: 'CPF não informado.'});

    try{
        await Passageiro.findOneAndDelete({cd_CpfPassageiro},(err,resp) => {
            if(err) return res.status(400).send({error: 'Erro ao excluir registro do passageiro.'});
            return res.send(resp);
        })
    }
    catch(err){
        return res.status(500).send({error: 'Erro ao remover passageiro.'});
    }
})
module.exports = router;