const fetchTodos = async () => {
    try {
        const response = await axios.get('http://localhost:5000/todos');
        setTodos(response.data);
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
};