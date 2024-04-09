import { pool } from './database.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = 10;

export async function registerUser(name, email, password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const [result] = await pool.query(
            `
            INSERT INTO users (name, email, password_hash, password_salt)
            VALUES (?, ?, ?, ?)
            `,
            [name, email, passwordHash, salt]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error registering user:', error);
        return null;
    }
}

export async function authenticateUser(email, password) {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );
        if (rows.length === 0) {
            return null;
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return null;
        }

        return user;
    } catch (error) {
        console.error('Error authenticating user:', error);
        return null;
    }
}



export async function getTodosByID(id) {
    try {
        const [rows] = await pool.query(
            `
            SELECT todos.*, shared_todos.shared_with_id
            FROM todos
            LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
            WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?
          `,
            [id, id]
        );
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        return [];
    }
}

export async function getTodo(id) {
    try {
        const [rows] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error executing query:', error);
        return null;
    }
}

export async function getSharedTodoByID(id) {
    try {
        const [rows] = await pool.query(
            `SELECT * FROM shared_todos WHERE todo_id = ?`,
            [id]
        );
        return rows[0];
    } catch (error) {
        console.error('Error executing query:', error);
        return null;
    }
}

export async function getUserByID(id) {
    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error executing query:', error);
        return null;
    }
}

export async function getUserByEmail(email) {
    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
        return rows[0];
    } catch (error) {
        console.error('Error executing query:', error);
        return null;
    }
}

export async function getUsers() {
    try {
        const [rows] = await pool.query(`SELECT * FROM users`);
        return rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

export async function createTodo(user_id, title) {
    try {
        const [result] = await pool.query(
            `
            INSERT INTO todos (user_id, title)
            VALUES (?, ?)
          `,
            [user_id, title]
        );
        const todoID = result.insertId;
        return getTodo(todoID);
    } catch (error) {
        console.error('Error creating todo:', error);
        return null;
    }
}

export async function deleteTodo(id) {
    try {
        const [result] = await pool.query(
            `
            DELETE FROM todos WHERE id = ?;
            `,
            [id]
        );
        return result;
    } catch (error) {
        console.error('Error deleting todo:', error);
        return null;
    }
}

export async function toggleCompleted(id, value) {
    try {
        const newValue = value === true ? "TRUE" : "FALSE";
        const [result] = await pool.query(
            `
            UPDATE todos
            SET completed = ${newValue} 
            WHERE id = ?;
            `,
            [id]
        );
        return result;
    } catch (error) {
        console.error('Error updating todo completeness:', error);
        return null;
    }
}

export async function shareTodo(todo_id, user_id, shared_with_id) {
    try {
        const [result] = await pool.query(
            `
            INSERT INTO shared_todos (todo_id, user_id, shared_with_id) 
            VALUES (?, ?, ?);
            `,
            [todo_id, user_id, shared_with_id]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error sharing todo:', error);
        return null;
    }
}
