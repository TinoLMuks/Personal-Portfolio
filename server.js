const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/personal-portfolio')
const db = mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection successful")
})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    subject:String,
    message:String 

    //name: {type:String, maxlength: 30, required: true },
    //email:{type: String, maxlength: 20, required: true},
    //subject: {type: String, maxlength: 130, required: true},
    //message:{ type: String, maxlength: 264, required: true}


      

})

const Users= mongoose.model("data", userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.post('/index.html', async (req, res)=> {
    const {name, email, subject, message} = req.body
    const user = new Users({
        name,
        email,
        subject,
        message

    })

    await user.save()
    console.log(user)
    res.send("Form Submission Successful")

})

app.listen(port,()=>{
    console.log("Server started")
});