const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride = require('method-override');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


main().then(()=>{
    console.log("Connected!");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.listen(8080,(req,res)=>{
    console.log("Listening on port :8080");
})

//index route
app.get("/chats",async (req,res)=>{
    let chats= await Chat.find();
    res.render("index.ejs",{chats})
})

//new chat route

app.get("/new",(req,res)=>{
    res.render("newchat.ejs");
})

app.post("/chats/newchat",(req,res)=>{
    let {from,msg,to}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        message:msg,
        created_at:new Date()
    })

    newChat.save().then((result)=>{
        res.redirect("/chats");
    }).catch((err)=>{
        console.log(err);
    })
})

//edit route

app.get("/chats/:id/edit",async(req,res)=>{
    let{id}=req.params;
    let chat=await Chat.findById(id)
    res.render("editchat.ejs",{chat});
})

app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg}=req.body;
    let updateChat=await Chat.findByIdAndUpdate(id,{message:msg},{runValidators:true},{new:true})
    res.redirect("/chats");
})

app.delete("/chats/:id/delete",async (req,res)=>{
    let {id}=req.params;
    let deleteChat=await Chat.findByIdAndDelete(id);
    res.redirect("/chats");

})