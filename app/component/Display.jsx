import React, { useState , useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    // [{ size: ['2' , '1128' , '50']}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    ['clean']                                         // remove formatting button
  ],
};

export const Display = () => {
 



  const [text ,  setText] = useState('');
  const [newLines, setLines] = useState(() => {
    const savedLines = localStorage.getItem('lines');
    return savedLines ? JSON.parse(savedLines) : [];
  });

  const saveItem = (e) => {
    e.preventDefault ();
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
      <ReactQuill 
         className="w-full h-[60vh] shadow px-4 py-2 block"
            modules={modules}
      />
      <form>
        <textarea name="" value={text} onChange={(e) => setText(e.target.value)} id=""></textarea>
        <button onClick={saveItem} className='w-full'>Save Item</button>
        <button>Click to edit</button>
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
