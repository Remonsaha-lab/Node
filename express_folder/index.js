// const express = require('express');
// const app = express();


// function calculateSum(n) {
//     let sum =0;
//     for(let i = 0 ; i<= n ; i++){
//         sum += i;
//     }
//     return sum;
// }
// // req , res => request and response
// app.get('/' , (req , res) => {
//     const a = req.query.a;
//     const ans = calculateSum(a);
//     res.send(ans.toString());
// })
// app.listen(3000);

// const express = require("express");
// const fs = require("fs");

// const app = express();

// app.get('/files/:filename' , (req , res) => {
//     const name = req.params.filename;
//     console.log(name);
//     fs.readFile(name , 'utf-8' , (err , data) => {
//          res.json({
//             data
//          })
//     })
   
// });
// app.listen(3001);



const express = require("express");

const app = express();
// function isOldEnough(age){
//     if(age>= 14){
//         return true;
//     }
//     else{
//         return false;
//     }
// }

//using middleware
function isOldEnoughMiddleware(req , res ,next){
    const age = req.query.age;
    if(age >= 14){
        next(); // control will flow to the next middleware or endpoint
    }
    else{
        res.json({
            message: "You are not old enough to ride the ride 2"
        });
    }
}
app.get('/ride1' ,isOldEnoughMiddleware , ( req , res) => {
    res.json({
        message: "You are old enough to ride the ride 1"
    })
})
app.get('/ride2' , isOldEnoughMiddleware, (req , res) => {
    res.json({
        message: "You are old enough to ride the ride 2"
    })
})       
  
app.listen(3002, () => {
    console.log('Ride server is running on http://localhost:3002');
}); 








    