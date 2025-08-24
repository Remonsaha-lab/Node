const express = require('express');
const app = express();

//you have been given a express server which has few end points .
//Your task is to create a global middleware (app.use) which will rate the limit the requests in a single second, the server should block them with a 404;
//User will be sending in their user id in the header as "user-id"
//you have veeb given a numberofrequestsforuser object to start off with which clear every one second


let numberOfRequestsForUsers = {};
setInterval( () => {
    numberOfRequestsForUsers = {};
} , 1000);

app.use((req , res , next) => {
    const userId = req.headers['user-id'];
    if(numberOfRequestsForUsers[userId]){
        numberOfRequestsForUsers[userId] += 1;
        
        if(numberOfRequestsForUsers[userId] > 5){
            res.status(404).send("No entry");
            return; 
        }
        else{
            next(); // control will flow
        }
    } else{
        numberOfRequestsForUsers[userId] = 1;
        next();
    }
});

// Add some test endpoints
app.get('/user', (req, res) => {
    res.json({ message: 'User endpoint accessed successfully' });
});

app.get('/data', (req, res) => {
    res.json({ message: 'Data endpoint accessed successfully' });
});

app.get('/status', (req, res) => {
    res.json({ 
        message: 'Server is running',
        currentRequests: numberOfRequestsForUsers
    });
});

app.listen(3001, () => {
    console.log('Rate limiter server running on http://localhost:3001');
    console.log('Send requests with "user-id" header to test rate limiting');
});


