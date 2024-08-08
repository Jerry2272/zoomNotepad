import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { db } from '../firebase/Firebase';
import { addDoc, collection } from 'firebase/firestore';

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

export default function EditableLine({ index, text, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const docRef = collection(db, 'editedNote');
    if (newText.replace(/<\/?[^>]+(>|$)/g, "").length < 10) {
      alert('Text must be at least 10 characters long.');
      return;
    } 

    try {
      await addDoc(docRef, { lines: newText });
      console.log("Document successfully written!");
      onSave(index, newText);
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error occurred');
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(index);
  };

  return (
    <div className="editable-line">
      {isEditing ? (
        <div className="editing flex justify-between items-center">
          <ReactQuill
            modules={modules}
            value={newText}
            onChange={setNewText}
            className="w-full h-[60vh] shadow block bg-slate-900 text-white my-10"
          />
          <button onClick={handleSave} className="save-button bg-slate-500 text-white px-4 py-2 rounded ml-2">
            Save
          </button>
        </div>
      ) : (
        <div>
          <div
            className="text-display w-[50%] h-[50px] px-10 py-6 mt-10 bg-slate-600 text-white rounded cursor-pointer"
            style={{ overflow: 'hidden' }}
            onClick={handleEdit}
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <div className="flex justify-between mt-2">
            <button onClick={handleDelete} className="delete-button bg-slate-500 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
