const mongoose = require('mongoose');
const AgentSchema = new mongoose.Schema({
  name:String, email:String, mobile:String, password:String, createdAt:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Agent', AgentSchema);
