// src/Todo.js
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
 
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://playground.4geeks.com/todo/');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data); // Set the fetched todos in the state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchTodos(); // Call fetchTodos when the component mounts
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();

    // Prevent adding empty todos
    if (!newTodo.trim()) return;

    const newTodoObj = {
      title: newTodo,
      completed: false, 
    };

    try {
      // Send POST request to the API to create a new todo
      const response = await fetch('https://playground.4geeks.com/todo/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodoObj), // Convert todo object to JSON
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const savedTodo = await response.json(); 
      setTodos([...todos, savedTodo]);
      setNewTodo('');
    } catch (error) {
      setError(error.message); // Display error message if something fails
    }
  };

  // Handle input changes for the new todo
  const handleInputChange = (e) => {
    setNewTodo(e.target.value); // Update the newTodo state with the input value
  };


    return (
      <div className = "container">
        <h1>Todos</h1>
        <ul> 
          <li>
            <input
            type = "text"
            onChange = {(e) => setInputValue(e.target.value)}
            value = {inputValue}
            onKeyPress = {(e) => {
              if (e.key == "Enter") {
                setTodos(todos.concat([inputValue]));
                setInputValue("");
              }
            }}
            placeholder = "What Needs to be done?"></input>
          </li>
          {todos.map((item, index) => (
          <li> 
            {item} <i class = "fas fa-trash-alt" onClick = {() => setTodos( todos.filter(( t, currentIndex) => index  != currentIndex 
            )
            )
            }></i>
            </li>
          ))}
        </ul>
        <div>{todos.length} tasks</div>
      </div>
    );
  };

export default Home;