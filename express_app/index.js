const express = require("express");
const app = express();


app.use(express.json()); //help to parse any post body
const users = [];
/*
      [{
          "username": "user1",
          "password": "pass1",
          "Token": "dnirifiniooaononijfj"
      }]
*/
function generateToken() {

    // Create an array of options for the token 
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // Create a variable to store the token
    let token = "";

    
    for (let i = 0; i < 32; i++) {

        // Add a random character from the options array to the token
        token += options[Math.floor(Math.random() * options.length)];
    }

   
    return token;
}
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
        const token = generateToken();
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


app.listen(3001 , ()=> {
    console.log("Server is running on http://localhost:3001");
})
