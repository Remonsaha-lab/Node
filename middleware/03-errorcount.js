const express = require('express');

const app = express();

//You have been given an express server which has a few endpoints
//your task is to 
 // .1 ensure that if there is ever an exception i  the end user sees a status code of 404 
 // 2. Maintain the errorcount variable those value should go up every time in there is an exception in any endpoint

 app.get('/user' , (req , res) => {
    //let a; //undefined
   // a.length ; //throw an error
   throw new Error("This is an error");
   res.status(200).json({ name: 'john'});
 })
 app.post('/user' , (req, res) => {
    res.status(200).json({msg: 'created dummy user'});
 })
 app.get('/errorcount' , (req ,res) => {
    res.status(200).json({errorCount});
 })

 //add  error handling middleware
 let errorCount = 0;
 app.use((err, req, res, next) => {
   errorCount++;
   res.status(404).send({});
 })

 app.listen(3004, () => {
    console.log("Server is running on http://localhost:3004");
 })