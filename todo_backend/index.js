const express = require("express");
const {UserModel , TodoModel} = require("./db")
const jwt = require("jsonwebtoken");
const JWT_SECRET = "remontodoappjdbdb"
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb+srv://Remonsaha:4LTWUPvKMLq90zrf@cluster0.xw7ysbb.mongodb.net/remon_todo")
app.use(express.json()); //help to parse any post from body
app.post("/signup" , async (req,res)=> {
    const email = req.body.email;
    const password  = req.body.password;

    const  name  = req.body.name;
     await UserModel.create({
        email: email,
        password: password,
        name:name
    })

    res.json({
        message: "Logged in"
    })
})

app.post("/signin" , async (req, res)=> {
    const email = req.body.email;
    const password  = req.body.password;

    const user = await UserModel.findOne({
        email: email,
        password: password
    })
    console.log(user);
    if(user){
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.json({
            token: token
        })
    }
    else {
        res.status(400).json({
            message: "Incorrect Credentials"
        })
    }

})

app.post("/todo" , (req,res)=> {

})
app.get("/todos" , (req,res)=> {

});

app.listen(3005 , ()=> {
    console.log("Server is running on http://localhost:3005");
});