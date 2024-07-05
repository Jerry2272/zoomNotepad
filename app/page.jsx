'use client';

import { useState, useEffect } from 'react';
import EditableLine from './component/EditableLine';
import { TodoList } from './todoList/TodoList';

function Home() {
  const [type, setType] = useState('');
  const [theme, setTheme] = useState('light');
  const [displayNotepad, setDisplayNotepad] = useState(false);
  const [displayTodoList, setDisplayTodoList] = useState(false);
  const [lines, setLines] = useState(() => {
    const savedLines = localStorage.getItem('saveText');
    try {
      return savedLines ? JSON.parse(savedLines) : [];
    } catch (e) {
      console.error('Error parsing saveText from localStorage:', e);
      return [];
    }
  });

  const handleAddLine = (e) => {
    e.preventDefault();
    if (type === '') {
      alert('Input text box is empty');
    } else {
      const newLines = [...lines, type];
      setLines(newLines);
      setType('');
      localStorage.setItem('saveText', JSON.stringify(newLines));
    }
  };

  useEffect(() => {
    localStorage.setItem('saveText', JSON.stringify(lines));
  }, [lines]);

  const handleSaveLine = (index, newText) => {
    const updatedLines = lines.map((line, i) => (i === index ? newText : line));
    setLines(updatedLines);
  };

  const handleDeleteLine = (index) => {
    const updatedLines = [...lines];
    updatedLines.splice(index, 1);
    setLines(updatedLines);
    localStorage.setItem('saveText', JSON.stringify(updatedLines));
  };

  const toggleNotepad = () => {
    setDisplayNotepad(!displayNotepad);
  };

  const toggleTodoList = () => {
    setDisplayTodoList(!displayTodoList);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <main className={`theme-${theme}`} style={{ height: '100vh' }}>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
      <h2>Welcome to your Notepad</h2>
      <div className="flex justify-between">
        <button className="bg-[#1d1a1a] py-8 px-8 w-[40%] text-white" onClick={toggleNotepad}>
          {displayNotepad ? 'Close Notepad' : 'Open Notepad'}
        </button>
        <button className="bg-[#1d1a1a] py-8 px-8 w-[40%] text-white" onClick={toggleTodoList}>
          {displayTodoList ? 'Close Todo List' : 'Open Todo List'}
        </button>
      </div>
      {displayNotepad && (
        <form>
          <div>
            {lines.map((line, index) => (
              <EditableLine
                key={index}
                index={index}
                text={line}
                onSave={handleSaveLine}
                onDelete={handleDeleteLine}
              />
            ))}
          </div>
          <div className="inputForm">
            <textarea
              name="textarea"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full h-[80vh] shadow px-20 my-10"
              placeholder="Add New Note"
            />
            <button onClick={handleAddLine} className="bg-zinc-700 py-3 px-7">
              Save Note
            </button>
          </div>
        </form>
      )}
      {displayTodoList && <TodoList />}
    </main>
  );
}

export default Home;
