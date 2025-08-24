const express = require("express");
const JWT_SECRET = "randomremonlike"
const jwt = require("jsonwebtoken");
const app = express();


app.use(express.json()); //help to parse any post from body
const users = [];
/*
      [{
          "username": "user1",
          "password": "pass1",
          "Token": "dnirifiniooaononijfj"
      }]
*/

app.post("/signup" , (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

   res.json({
    message:"Hey you are signed in"
   })
   
});

app.post("/signin" , (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const founduser = users.find((u)=>{
          if (u.username === username && u.password === password){
            return  true;
          }
          else {
              return false;
          }
    })
    if(founduser){
        const token =jwt.sign({
            username: username
        }, JWT_SECRET); // convert their userna me to jwt
        res.json({
            message: "You are signed in",
            Token: token
        })
    }
    else {
        res.json({
            message: "Invalid username or password"
        })
    }
})

app.get("/me" , (req, res)=> {
    const token = req.headers.token; // jwt

    const decodedInformation = jwt.verify(token , JWT_SECRET); // decode the token to get the username
    const username = decodedInformation.username;
    let founduser = null;
    for(let i =0 ; i <users.length ; i++){
        if(users[i].username == username){
            founduser = users[i];
        }
        
    }
    if (founduser){
        res.json({
            username : founduser.username,
            password: founduser.password
        }) 
    }
    else {
        res.json({
            message: "Invalid token"
        })
    }
})
app.listen(3001 , ()=> {
    console.log("Server is running on http://localhost:3001");
})
