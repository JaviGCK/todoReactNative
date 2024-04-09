import express from "express";
import { authenticateUser, getUserByEmail } from './controllers.js';

import {
    getTodosByID,
    getSharedTodoByID,
    getUserByID,
    toggleCompleted,
    deleteTodo,
    shareTodo,
    createTodo,
    getUsers,
} from "./controllers.js";

const router = express.Router();

router.get("/users", async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

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

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authenticateUser(email, password);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'User authenticated successfully', user });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await getUserByEmail();
        res.status(200).send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
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

        if (!userToShare) {
            return res.status(404).json({ error: 'User not found' });
        }

        const sharedTodo = await shareTodo(todo_id, user_id, userToShare.id);

        if (!sharedTodo) {
            return res.status(500).json({ error: 'Failed to share todo' });
        }

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
