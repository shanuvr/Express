import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
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
    },
     phone:{
        type:String,
        required:true
    },
     role:{
        type:String,
        required:true
    },
    active:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()

    }
})

const userModel = mongoose.model('userModel',userSchema,'people')
export default userModel;