const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MotoristaSchema = new Schema({
	nm_Motorista: { type: String, required:true },
	dt_NascMotorista: {type: String, required: true },
	cd_CpfMotorista: {type: Number, required: true, unique: true},
	ds_ModeloCarro: {type: String, required: true },
	ic_IsAtivo: {type: Boolean, required: true, default: true },
	ds_Sexo: {type: String, required: true}
});

module.exports = mongoose.model('motorista',MotoristaSchema);
