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
function  logger(req, res , next) {
    console.log(req.method + "request came")
    next();
}

app.post("/signup" ,logger, (req,res) => {
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

app.post("/signin" ,logger, (req,res) => {
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

function auth(req, res ,next){
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token , JWT_SECRET);
    const username = decodedInfo.username;
    if(username){
        next();
    }
    else {
        res.json({
            message: "Invalid token"
        })
    }
}
app.get("/me" , logger,auth, (req, res)=> {
    
    let founduser = null;
    for(let i =0 ; i <users.length ; i++){
        if(users[i].username == req.username){
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

app.listen(3002 , ()=> {
    console.log("Server is running on http://localhost:3002");
})
