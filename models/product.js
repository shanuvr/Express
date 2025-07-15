import mongoose from 'mongoose'
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
     category:{
        type:String,
        
    },
     price:{
        type:String,
   
    },
     description:{
        type:String,
      
    }
})

const productModel = mongoose.model('productModel',productSchema,'products')
export default productModel;