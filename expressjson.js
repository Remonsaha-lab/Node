const express = require("express");

const app = express();
//In express , it you want to send json data
//you need to use express.json() middleware
app.use(express.json());
app.post("/sum" , (req,res) => {
    const data =  req.body;
    const a =  parseInt(data.a);
    const b = parseInt(data.b);
    res.json({
        ans: a + b,
    });
})
app.listen(3000 , () => {
    console.log("server is running on port on http://localhost:3000");
});