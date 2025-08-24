const express = require("express");
const cors = require("cors");
const app  = express();

app.use(cors());
app.use(express.json());
app.get("/sum" , (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({ sum: a + b });
});
app.post("/sum" , (req, res) => {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    res.json({ sum: a + b });
})

app.listen(3002 , () => {
    console.log("Server is running on http://localhost:3002")
})