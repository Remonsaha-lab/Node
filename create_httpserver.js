/*
Create an HTTP Server
It should have 4 routes

1. http://localhost:3000/sum?a=1&b=2
2. http://localhost:3000/subtract?a=1&b=2
3. http://localhost:3000/multiply?a=1&b=2
4. http://localhost:3000/divide?a=1&b=2

Inputs given at the end after `?` are known as query parameters (usually used in GET requests)

The way to get them in an HTTP route is by extracting them from the `req` argument (req.query.a , req.query.b)
*/


// import express module using require function and store it in express variable
const express = require("express");

// create an express application using express function
const app = express();

let requestcount = 0;

function requestInc(req,res){
    requestcount = requestcount + 1;
    console.log("total no of request= " + requestcount);
    
}
function realSumHandler(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a + b,
    });
}
// create a get route with the path /sum
app.get("/sum",requestInc ,  realSumHandler);

// create a get route with the path /subtract
app.get("/subtract",requestInc,  function (req, res) {
    // get the values of a and b from the query parameters and convert them to integers
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    // send the difference of a and b as a response in json format
    res.json({
        ans: a - b,
    });
});

// create a get route with the path /multiply
app.get("/multiply", requestInc, function (req, res) {
    // get the values of a and b from the query parameters and convert them to integers
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    // send the product of a and b as a response in json format
    res.json({
        ans: a * b,
    });
});

// create a get route with the path /divide
app.get("/divide", requestInc, function (req, res) {
    // get the values of a and b from the query parameters and convert them to integers
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    // send the division of a and b as a response in json format
    res.json({
        ans: a / b,
    });
});

// Start the server on port 3000
app.listen(3000);