const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CorridaSchema = new Schema({
    cd_CpfMotorista : { type: Number, required: true },
    cd_CpfPassageiro : { type: Number, required: true },
    vl_Corrida: { type: Number, required: true }
})

module.exports = mongoose.model('corrida',CorridaSchema);