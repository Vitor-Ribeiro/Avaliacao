
//Arquivo de configuração da coleção model que irá estruturar os campos

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProdutoSchema = new Schema({
  name: String,
  serial: String,
  local: String,
  tipo: String
});

module.exports = mongoose.model("Produto", ProdutoSchema);