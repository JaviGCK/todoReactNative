import express from "express";
import {
    getTodosByID,
    getSharedTodoByID,
    getUserByID,
    toggleCompleted,
    deleteTodo,
    shareTodo,
    createTodo,
} from "./controllers.js";

const router = express.Router();

router.get("/todos/:id", async (req, res) => {
    try {
        const todos = await getTodosByID(req.params.id);
        res.status(200).send(todos);
    } catch (error) {
        console.error('Error fetching todos by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/todos/shared_todos/:id", async (req, res) => {
    try {
        const todo = await getSharedTodoByID(req.params.id);
        const author = await getUserByID(todo.user_id);
        const shared_with = await getUserByID(todo.shared_with_id);
        res.status(200).send({ author, shared_with });
    } catch (error) {
        console.error('Error fetching shared todo by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        const user = await getUserByID(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put("/todos/:id", async (req, res) => {
    try {
        const { value } = req.body;
        const todo = await toggleCompleted(req.params.id, value);
        res.status(200).send(todo);
    } catch (error) {
        console.error('Error toggling completed status of todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete("/todos/:id", async (req, res) => {
    try {
        await deleteTodo(req.params.id);
        res.send({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error('Error deleting todo by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/todos/shared_todos", async (req, res) => {
    try {
        const { todo_id, user_id, email } = req.body;
        const userToShare = await getUserByEmail(email);
        const sharedTodo = await shareTodo(todo_id, user_id, userToShare.id);
        res.status(201).send(sharedTodo);
    } catch (error) {
        console.error('Error sharing todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/todos", async (req, res) => {
    try {
        const { user_id, title } = req.body;
        const todo = await createTodo(user_id, title);
        res.status(201).send(todo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
