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
            console.error('Error en inicio de sesión');
            return null;
        }
    } catch (error) {
        console.error('Error de red:', error);
        return null;
    }
};


export const getUserTodos = async (userId) => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${userId}`);
        if (!response.ok) {
            throw new Error('Error fetching todos');
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
            throw new Error('Failed to delete todo');
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
};

