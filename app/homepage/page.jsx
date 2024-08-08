'use client';

import { useState, useEffect } from 'react';
import EditableLine from '../component/EditableLine';
import { TodoList } from '../todoList/TodoList';
import useLocalStorage from '../hook/useLocalStorage';
import { auth, db } from '../firebase/Firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { signOut } from 'firebase/auth';
import useAuth from '../hook/useAuth';

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']
  ],
};

function Login() {
  const [type, setType] = useState('');
  const [theme, setTheme] = useState('light');
  const [displayNotepad, setDisplayNotepad] = useState(false);
  const [displayTodoList, setDisplayTodoList] = useState(false);
  const [lines, setLines] = useLocalStorage('saveText', []);
  const isAuthenticated = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Ensure the code is only run on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        alert(`Logout Successful`);
        window.location.href = '/';
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  const handleAddLine = async (e) => {
    e.preventDefault();
    const addDocs = collection(db, 'notes');

    if (type.trim() === '') {
      alert('Input text box is empty');
      return;
    }

    const newLines = [...lines, type];
    setLines(newLines);
    setType('');

    try {
      await addDoc(addDocs, { lines: newLines });
      console.log("Document successfully written!");
    } catch (error) {
      console.error('Error adding document: ', error.message);
      alert('Watch out for errors');
    }
  };

  const handleSaveLine = (index, newText) => {
    const updatedLines = lines.map((line, i) => (i === index ? newText : line));
    setLines(updatedLines);
  };

  const handleDeleteLine = (index) => {
    const updatedLines = [...lines];
    updatedLines.splice(index, 1);
    setLines(updatedLines);
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
    <main className={`theme-${theme} homePage flex flex-col px-[2em]`} style={{ height: '100vh' }}>
      <button onClick={logOut} className='fixed bottom-[2em] right-[30px]'>LogOut</button>
      <button onClick={toggleTheme} className='absolute right-0'>
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
      <div className='pt-[2em]'>
        <h2 className='lg:text-4xl py-10 uppercase text-center'>Welcome to your <i>zoomNote</i></h2>
        <div className="flex justify-between my-2 px-[2em] text-center bg-slate-900 py-[4em] rounded-[40px] shadow-black items-center gap-[50px]">
          <button className="bg-slate-700 py-8 px-8 w-[40%] text-white" onClick={toggleNotepad}>
            {displayNotepad ? 'Close Notepad' : 'Open Notepad'}
          </button>
          <button className="bg-slate-700 py-8 px-8 w-[40%] text-white" onClick={toggleTodoList}>
            {displayTodoList ? 'Close Todo List' : 'Open Todo List'}
          </button>
        </div>
      </div>

      {displayNotepad && (
        <form>
          <div className='text-white'>
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

          {isClient && (
            <div className="inputForm flex flex-col text-white">
              <ReactQuill
                modules={modules}
                value={type}
                onChange={setType}
                className="w-full h-[80vh] bg-slate-900 text-white my-10"
                placeholder="Add New Note Here"
              />
              <button onClick={handleAddLine} className="bg-zinc-900 py-3 text-white px-7 rounded">
                Save Note 
              </button>
            </div>
          )}
        </form>
      )}
      {displayTodoList && <TodoList />}
    </main>
  );
}

export default Login;
