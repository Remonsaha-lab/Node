const express = require('express');

const app = express();

let requestCount = 0;

// you have been given an express server which has a a few endpoints ,
//Your task is to create a global  middleware (app.use) which will maintain a count of the number of requests made to the server in the global variable requestcount.

app.use((req, res , next) => {
    requestCount++;
    next();
})
app.get('/users' , (req , res) => {
    res.status(200).json({name : 'john'});
})
app.post('/users' , (req , res) => {
    res.status(200).json({requestCount});
})
app.get('/requestcount', (req, res) => {
    res.status(200).json({requestCount});
})

// Start the server only if this file is run directly (e.g., `node 01-requestcount.js`)
// This prevents the server from starting automatically when imported by a test file.
if (require.main === module) {
    app.listen(3001, () => {
        console.log('server is running on http://localhost:3001');
    });
}

module.exports = app;