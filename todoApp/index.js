const express = require('express')
const app = express()
const port = 3000
//route handlers
let users = [
    {
        todos: []
    },
    {
        todos:  []
    }
]
//store the data in a title , foundation for database
//add user logic
app.get('/', (req, res) => {
    //create a random id for todo
    //extract the todo title from the body
  todos.push({
    title,
    id
  })
})
app.delete('/', (req , res) => {
    //extract the todo id
   
    //remove the todo from here
  
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
