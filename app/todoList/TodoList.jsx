import React, { useEffect, useState } from 'react';

export const TodoList = () => {
  const [todo, setTodo] = useState('');
  const [todoItems, setTodoItems] = useState(() => {
    const savedTodos = localStorage.getItem('todolist');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const addTodo = (e) => {
    e.preventDefault();
    if (todo.trim() === '') {
      alert('To-Do item cannot be empty');
      return;
    }
    const newTodoItems = [...todoItems, todo];
    setTodoItems(newTodoItems);
    setTodo('');
    localStorage.setItem('todolist', JSON.stringify(newTodoItems));
  };

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(todoItems));
  }, [todoItems]);

  return (
    <div className="mt-11 p-4 bg-white rounded shadow-lg">
      <h1 className="font-bold text-3xl mb-4">Welcome to the To-Do List Board</h1>
      <form onSubmit={addTodo} className="flex mb-4">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="py-2 px-4 border rounded-l w-full"
          placeholder="Enter a new to-do item"
        />
        <button className="py-2 bg-gray-500 text-white px-8 border-l rounded-r" type="submit">
          Add To-Do
        </button>
      </form>
      <ul className="list-disc pl-5">
        {todoItems.map((item, index) => (
          <li key={index} className="flex items-center mb-2">
            <input type="checkbox" id={`todo-${index}`} className="mr-2" />
            <label htmlFor={`todo-${index}`}>{item}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};
