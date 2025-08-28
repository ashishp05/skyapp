import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name : {
        type :String ,
        trim : true ,
        required : [true , "Name is required."]
    },
    tag : {
        type :String ,
        trim : true,
        required : [true , "Tag is required."]

    },
    description : {
        type :String ,
        trim : true
    },
    price : {
        type :String ,
        trim : true ,
        default : 0
    },
    images : [
        {  
             _id : false,
            type : String,
            trim : true
        }
    ],
    productDetails: {
       brand : {
        type :String ,
        trim :true
       },
        processor : {
        type :String ,
        trim :true
       },
        RAM : {
        type :String ,
        trim :true
       },
        storage : {
        type :String ,
        trim :true
       },
        display : {
        type :String ,
        trim :true
       },
        graphics : {
        type :String ,
        trim :true
       },
        os : {
        type :String ,
        trim :true
       },
        connectionTypes : {
        type :String ,
        trim :true
       },
        weight : {
        type :String ,
        trim :true
       },
        createdAt : {
            type :Date ,
            default : Date.now
        }
       
    }

},{timestamps : true})


const Product =  mongoose.models.Product || mongoose.model("Product", productSchema);

export default  Product;  