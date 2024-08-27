i// src/components/TodoItem.js
import React from 'react';

const TodoItem = ({ todo, onRemove }) => {
  return (
    <li>
      {todo.text}
      <button onClick={() => onRemove(todo.id)}>Remove</button>
    </li>
  );
};

export default TodoItem;


