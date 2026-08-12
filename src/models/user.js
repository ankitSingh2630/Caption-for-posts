const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{ timestamps: true });

userSchema.pre('save',async function(){
    if(!this.isModified ){
        return;
    }
    this.password= await bcrypt.hash(this.password,10);
})

userSchema.methods.validatePassword=async function(password){
    const validatePassword= await bcrypt.compare(password,this.password);
    return validatePassword
}

const User = mongoose.model('User', userSchema);

module.exports = User;