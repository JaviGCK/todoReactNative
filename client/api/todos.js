const BASE_URL = 'http://localhost:8080';

// fetchData.js
export async function fetchData() {
    try {
        const response = await fetch(`http://localhost:8080/todos/1`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return {};
    }
}





export async function deleteTodo(id, clearTodo) {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        headers: {
            "x-api-key": "abcdef123456",
        },
        method: "DELETE",
    });
    clearTodo(id);
    console.log(response.status);
}

export async function toggle(id, completed, toggleTodo) {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        headers: {
            "x-api-key": "abcdef123456",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
            value: completed ? false : true,
        }),
    });

    const data = await response.json();
    toggleTodo(id);
    console.log(data);
}
