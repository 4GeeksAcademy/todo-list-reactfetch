// src/components/TodoList.js
import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    
    fetch('/api/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = () => {
    if (newTodo.trim() === '') return;

    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newTodo }),
    })
      .then(response => response.json())
      .then(data => {
        setTodos([...todos, data]);
        setNewTodo('');
      });
  };

  const removeTodo = id => {
    fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onRemove={removeTodo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

