const express = require("express");


const app = express();

// logs the method , timestamp and url
function middleware(req, res , next){
    console.log("Mehtod is :" + req.method);
    console.log("method is :" + req.url);
    console.log(new Date());
    next();
}
app.use(middleware);
app.get("/sum", function (req, res) {
   
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    
    res.json({
        ans: a + b,
    });
});


app.get("/subtract", function (req, res) {
   
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    
    res.json({
        ans: a - b,
    });
});


app.get("/multiply", function (req, res) {
   
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

  
    res.json({
        ans: a * b,
    });
});


app.get("/divide", function (req, res) {
 
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    
    res.json({
        ans: a / b,
    });
});


app.listen(3000 , () => {
    console.log("server is running on port on http://localhost:3000");
});