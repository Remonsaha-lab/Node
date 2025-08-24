const express = require('express');
const app = express();

// middleware to parse json data
app.use(express.json());
// 1. GET `/todos` - Retrieve all todo items
//    Description: Returns a list of all todo items.
//    Response: 200 OK with an array of todo items in JSON format.
//    Example: GET http://localhost:3000/todos

// 2. GET `/todos/:id` - Retrieve a specific todo item by ID
//    Description: Returns a specific todo item identified by its ID.
//    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
//    Example: GET http://localhost:3000/todos/123

// 3. POST `/todos` - Create a new todo item
//    Description: Creates a new todo item.
//    Request Body: JSON object representing the todo item.
//    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
//    Example: POST http://localhost:3000/todos
//    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }

// 4. PUT `/todos/:id` - Update an existing todo item by ID
//    Description: Updates an existing todo item identified by its ID.
//    Request Body: JSON object representing the updated todo item.
//    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
//    Example: PUT http://localhost:3000/todos/123
//    Request Body: { "title": "Buy groceries", "completed": true }

// 5. DELETE `/todos/:id` - Delete a todo item by ID
//    Description: Deletes a todo item identified by its ID.
//    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
//    Example: DELETE http://localhost:3000/todos/123
   
// - For any other route not defined in the server return 404
// */

let todos = [];

app.get('/todos' , (req , res) => {
    res.json(todos);
})

app.get('/todos/:id' , (req , res) => {
    //get the id from the rquest parameter
    const id = parseInt(req.params.id);
    const todo = todos.find((todo) => todo.id === id);
    if (todo){
        res.json(todo);

    }
    else {
        res.status(404).json({message: "Todo not found"});
    }
})

app.post('/todos' , (req ,res) => {
    const {title,description } = req.boby;
    const newtodo ={
        id: todos.length + 1,
        title: title,
        description: description
    }
    todos.push(newtodo);
    res.status(201).json(newtodo);
})

app.put('/todos/id' , (req, res) => {
    const id = parseInt(req,params.id);
    const todo = todos.find((todo) => todo.id === id);
    if (todo){
        const {title , description} = req.body;

        todo.title = title;
        todo.description = description;
        res.json(todo);
    }
    else{
        res.status(404).json({message: "Todo not updated"});
    }
})

app.delete('/todos/:id' , (req , res) => {
    const id = parseInt(req.params.id);

    const index = todos.findIndex((todo) => todo.id === id);

    if(index !== -1){
        todos.splice(index, 1);
        res.status(204).send("Todo deleted successfully with id " + id);
    }
    else{
        res.status(404).json({message: "Todo not deleted with id " + id});
    }
})

app.listen(3000 , () => {
    console.log("Todo server is running on http://localhost:3000");
})