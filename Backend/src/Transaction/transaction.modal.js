import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
transactionType:{
    type:String,
    trim:true,
    required:true,
    lowercase:true 
},
userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true

},
title:{
    type:String,
    trim:true,
    required:true,
    lowercase:true
},
amount:{
    type:Number,
    required:true       
},
paymentMethod:{
    type:String,
    lowercase:true,
    required:true,
    trim:true
},
notes:{
    type:String,
    trim:true,  
    lowercase:true,

}

},{timestamps:true});

const TransactionModel = model("Transaction", TransactionSchema);

export default TransactionModel;
