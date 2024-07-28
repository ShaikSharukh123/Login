const express=require('express');
const pasth=require('path');
const bcrypt=require('bcrypt');
const app=express();
const collection=require("./config");
//convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//use ejs as view enginee
app.set('view engine','ejs');
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("login");
});
app.get("/signup",(req,res)=>{
    res.render("signup");
});

//register user
app.post("/signup",async(req,res)=>{
const data={
    name:req.body.username,
    password:req.body.password
}
//check if user already exists
const existingUser=await collection.findOne({name:data.name});
if(existingUser){
    res.send("User already exists.Please choose a different username.");
}else{
    const saltRounds=10;
    const hashedPassword=await bcrypt.hash(data.password,saltRounds);
    data.password=hashedPassword; //replace with hash password instead of original password
    const userdata=await collection.insertMany(data);
    console.log(userdata);
}
});
app.post("/login",async(req,res)=>{
try{
    const check=await collection.findOne({name:req.body.username});
    if(!check){
        res.send("User Not Found!");
    }
    const isPasswordMatch=await bcrypt.compare(req.body.password,check.password);
    if(isPasswordMatch){
        res.render("home");
    }else{
        res.send("Wrong Password");
    }
}catch(e){
    res.send(e.msg);
}
});



const port=4000;
app.listen(port,()=>{
    console.log(`Server running of Port:${port}`);
})