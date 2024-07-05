import React, { useState , useEffect } from 'react'

export const Display = () => {
  const [text ,  setText] = useState('');
  const [newLines, setLines] = useState(() => {
    const savedLines = localStorage.getItem('lines');
    return savedLines ? JSON.parse(savedLines) : [];
  });

  const saveItem = (e) => {
    e.preventDefault();
    const newLines = [...newLines, text];
    setLines(newLines);
    setText('');
    localStorage.setItem('lines', JSON.stringify(newLines));
  };

  useEffect(() => {
    localStorage.setItem('lines', JSON.stringify(newLines));
  }, [newLines]);

  return (
    <div>
      <h2>Welocome to Local Storage</h2>
      <form>
        <textarea name="" value={text} onChange={(e) => setText(e.target.value)} id=""></textarea>
        <button onClick={saveItem} className='w-full'>Save Item</button>
        {text}
        {newLines.map((line , index) => (
          <div key={index}>
            {line}
          </div>
        ))}
      </form>
    </div>
  )
}
