const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Passageiro = new Schema({
	nm_Passageiro: { type: String, required:true },
	dt_NascPassageiro: {type: String, required: true },
	cd_CpfPassageiro: {type: Number, required: true, unique: true},
	ds_SexoPassageiro: {type: String, required: true}
});

module.exports = mongoose.model('passageiro',Passageiro);