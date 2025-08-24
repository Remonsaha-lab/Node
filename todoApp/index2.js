const express = require('express')
const app = express()
const path = require('path')

// Initialize todos array
const todos = []

app.use(express.static(path.join(__dirname , 'public')));

app.get('/create-todo', (req, res) => {
  res.send({todos})
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
});


