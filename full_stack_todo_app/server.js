const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const cors = require("cors");


const PORT = process.env.PORT || 3004;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

const app = express();

app.use(cors());
app.use(express.json()); 

app.use(express.static(path.join(__dirname, "public")));


const users = []; 
const todos = {}; 

function logger(req, res, next) {
    console.log(req.method + " request came");
    next();
}


app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.post("/signup", logger, (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }
    const exists = users.find(u => u.username === username);
    if (exists) {
        return res.status(409).json({ message: "User already exists" });
    }
  
    users.push({ username, password });
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "2h" });
    res.status(201).json({ message: "Signed up", token, user: { username } });
});


app.get(["/", "/login"], (_req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});


app.get("/todos-page", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "todo.html"));
});

app.post("/signin", logger, (req, res) => {
    const { username, password } = req.body;
    const found = users.find(u => u.username === username && u.password === password);
    if (!found) return res.status(401).json({ message: "Invalid username or password" });
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "2h" });
    res.json({ message: "Signed in", token, user: { username } });
});

function auth(req, res, next) {
    try {
        let token = req.headers.token;
       
        if (!token && req.headers.authorization) {
            const parts = req.headers.authorization.split(" ");
            if (parts[0].toLowerCase() === "bearer") token = parts[1];
        }
        if (!token) return res.status(401).json({ message: "Token missing" });
        const decodedInfo = jwt.verify(token, JWT_SECRET);
        if (!decodedInfo || !decodedInfo.username) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.username = decodedInfo.username;
        next();
    } catch (e) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

app.get("/todos", logger, auth, (req, res) => {
    const userTodos = todos[req.username] || [];
    res.json({ todos: userTodos });
});

app.post("/todos", logger, auth, (req, res) => {
    const { text } = req.body;
    if (!text || !text.trim()) {
        return res.status(400).json({ message: "Text required" });
    }
    const userTodos = todos[req.username] || [];
    const newTodo = {
        id: userTodos.length ? userTodos[userTodos.length - 1].id + 1 : 1,
        text: text.trim(),
        completed: false
    };
    userTodos.push(newTodo);
    todos[req.username] = userTodos;
    res.status(201).json({ todo: newTodo });
});

app.put('/todos/:id', logger, auth, (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const userTodos = todos[req.username] || [];
    const todo = userTodos.find(t => t.id === Number(id));
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    if (typeof completed === 'boolean') todo.completed = completed;
    res.json({ todo });
});

app.delete('/todos/:id', logger, auth, (req, res) => {
    const { id } = req.params;
    const userTodos = todos[req.username] || [];
    const index = userTodos.findIndex(t => t.id === Number(id));
    if (index === -1) return res.status(404).json({ message: 'Todo not found' });
    const [removed] = userTodos.splice(index, 1);
    todos[req.username] = userTodos;
    res.json({ message: 'Todo deleted', removedId: removed.id });
});


app.post('/logout', auth, (req, res) => {
    res.json({ message: 'Logged out (discard token client-side)' });
});


app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});


app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;


if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
