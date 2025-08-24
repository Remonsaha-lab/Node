Full Stack Todo App (Simple In-Memory Demo)

Updated Features:
- Static frontend served from Express (login + todo pages).
- JWT auth with Bearer tokens (2h expiry) using Authorization header.
- Consistent JSON response shapes for todos.
- Health check endpoint /health.
- Basic 404 + error handlers.

Run Locally:
1. (Optional) set environment: set JWT_SECRET=your-secret  (PowerShell: $env:JWT_SECRET='your-secret')
2. Install deps: npm install
3. Start: node server.js
4. Open http://localhost:3004/ (login page)

API Endpoints (for Postman):
POST /signup
  Body JSON: { "username": "alice", "password": "pass" }
  Response: { message, token, user }

POST /signin
  Body JSON: { "username": "alice", "password": "pass" }
  Response: { message, token, user }

GET /todos (Auth)
  Headers: Authorization: Bearer <token>
  Response: { todos: [ { id, text, completed } ] }

POST /todos (Auth)
  Body: { text: "Buy milk" }
  Response: { todo: { id, text, completed:false } }

PUT /todos/:id (Auth)
  Body: { completed: true }
  Response: { todo }

DELETE /todos/:id (Auth)
  Response: { message, removedId }

POST /logout (Auth)
  Response: { message }

Health:
GET /health -> { status: "ok" }

Notes:
- Data is ephemeral (in-memory). Restart clears users & todos.
- Do NOT use for production (no hashing, no validation libs, etc.).
- Extend by swapping arrays with a database (MongoDB, Postgres, etc.).

Postman Quick Steps:
1. Sign up to obtain token.
2. In Postman, create a Collection variable token and set it to the returned token.
3. Add an Authorization header: Bearer {{token}} to requests needing auth.
4. Chain requests: signup/signin -> get todos -> create / update / delete.

Possible Improvements (next):
- Password hashing (bcrypt) & validation.
- Persist data (database layer).
- Refresh tokens / token blacklist.
- Tests (Jest / Supertest).
- Input validation (zod / joi).
