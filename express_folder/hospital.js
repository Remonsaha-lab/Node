const express = require('express');
const app = express();

const users = {
    name: "Remon",
    kidneys: [
        {
            healthy: false
        } 
       
    ]
};
app.use(express.json());
app.get('/' , (req , res)=> {
    const RemonKidney = users.kidneys;
    const numberOfKidneys = RemonKidney.length;
    let numberOfHealthyKidneys = 0;
    for(let i =0 ; i < RemonKidney.length; i++){
        if(RemonKidney[i].healthy){
            numberOfHealthyKidneys++;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
});

app.post('/' , (req , res)=> {
    const isHealthy = req.body.isHealthy;
    users.kidneys.push({
        healthy: isHealthy
    })
    res.json({
        message: "Kidney health status updated successfully"
    })
})

app.put('/' , (req ,res) => {
    for(let i =0 ; i < users.kidneys.length; i++){
        users.kidneys[i].healthy = true;
    }
    res.json({
        message: "All kidneys are now healthy!"
    })
})


app.delete('/' , (req ,res) => {
    //only at least one unhealthy kidney is there do this , else 411 error
    if (isthereAtLeastOneUnhealthyKidney()){
        const newKidneys = [];
        for(let i =0 ; i<users.kidneys.length; i++){
            if(users.kidneys[i].healthy){
                newKidneys.push({healthy: true});
            }
        }
        users.kidneys = newKidneys;
        res.json({
            message: "Done! Removed all unhealthy kidneys."
        })
    }
    else {
        res.status(411).json({message:"you have no bad kidneys"});
    }
});
function isthereAtLeastOneUnhealthyKidney() {
    let atLeastOneUnhealthyKidney = false;
    for(let i =0 ; i< users.kidneys.length ; i++) {
        if(!users.kidneys[i].healthy){
            atLeastOneUnhealthyKidney = true;
            break; // Exit loop early once we find an unhealthy kidney
        }
    }
    return atLeastOneUnhealthyKidney;
}
 
app.listen(3000, () => {
    console.log('Hospital server is running on http://localhost:3000');
});