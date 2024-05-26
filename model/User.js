const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET_KEY = process.

const userSchema = Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
},{timestamps:true});

userSchema.methods.generateToken= function(){
const token = jwt.sign({_id:this.id}, "shhhhh");
}
const User = mongoose.model('User',userSchema)
module.exports = User;