export const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error in login.');
            return null;
        }
    } catch (error) {
        console.error('Network error:', error);
        return null;
    }
};

export const getUserTodos = async (userId) => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${userId}`);
        if (!response.ok) {
            throw new Error('Error fetching todos.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
};

export const addNewTask = async (userId, taskTitle) => {
    try {
        const response = await fetch('http://localhost:8080/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                title: taskTitle.trim(),
            }),
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Error adding task: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Error adding task: ${error.message}`);
    }
};

export const deleteTodo = async (taskId) => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${taskId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete todo.');
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
};

export const toggleTodoCompletion = async (todoId, completed) => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${todoId}`, {
            headers: {
                "x-api-key": "abcdef123456",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({
                value: completed,
            }),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error toggling todo completion:', error);
        throw error;
    }
};
