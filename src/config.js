const mongoose=require("mongoose");
const connect=mongoose.connect("mongodb://localhost:27017/login");
//check database connected or not
connect.then(()=>{
    console.log("database connected");
}).catch(()=>{
console.log("Database cannot be connected");
});

//create a schema
const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
//collection part
const collection=new mongoose.model("usernames",LoginSchema);
module.exports=collection;