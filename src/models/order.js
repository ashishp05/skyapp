import mongoose, { Mongoose } from "mongoose";

const orderSchema = new mongoose.Schema({
    userRef : {
        type :String,
        trim :true ,
    },
    items : [
        {
            _id:false ,
            productId : {
                type :mongoose.Schema.Types.ObjectId,   
                ref : "Product",
            },
             qty : {
                type : Number ,
                default : 1
            },
            name : {
                type :String,
                trim : true ,
                required : [true , "name is required"]
            },
            price : {
                type :String,
                trim : true,
                required : [true , "price is required"]

            },   
        },
    ],
    totalPrice : {
        type :Number,
        default : 0 ,
    },
    totalQty : {
        type :Number ,
        default : 0
    }

} , {
    timestamps : true
})

const Order = mongoose.models.Order || mongoose.model("Order" , orderSchema);

export default Order;