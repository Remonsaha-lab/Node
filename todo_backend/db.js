const mongoose = require("mongoose");

const schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const user = new schema ({
    email: String,
    password: String,
    name: String
});
const todo = new schema ({
    title: String,
    description: String,
    userId: ObjectId
});

const UserModel = mongoose.model("users", user);
const TodoModel = mongoose.model("todos", todo);
module.exports  = {
    UserModel: UserModel,
    TodoModel: TodoModel
}