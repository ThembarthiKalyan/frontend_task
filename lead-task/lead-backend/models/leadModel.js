const mongoose=require('mongoose');
const LeadSchema=mongoose.Schema({
    name: {type: String ,required: true},
    email:{ type: String, unique: true, required: true},
    number:{type: String, required: true},
    products:{type: Array, default: []}
});

const LeadModel=mongoose.model('Lead', LeadSchema);
module.exports=LeadModel;