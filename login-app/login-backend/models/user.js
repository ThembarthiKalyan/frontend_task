const mongoose=require('mongoose');
const UserSchema=mongoose.Schema({
    name: {type: String ,required: true},
    userName:{ type: String, unique: true, required: true},
    password:{type: String, required: true}
});

const User=mongoose.model('User', UserSchema);
module.exports=User;
