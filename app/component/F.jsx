import React, { useState } from 'react';
import { db } from '../firebase/Firebase'; // Adjust the import path according to your project structure
import { collection, getDocs, addDoc } from "firebase/firestore";

function F() {
  const [text, setText] = useState('');
  const [show, setShow] = useState([]);

  // Function to show documents
  const showDoc = async () => {
    const docRef = collection(db, 'notes');

    try {
      alert('Showing all documents');
      await addDoc(docRef, { infoText: text });
      setText('');
      console.log("Document successfully written!");
    } catch (error) {
      alert('Error occurred');
      console.error('Error adding document: ', error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const docRef = collection(db, 'notes');

    try {
      const dataCol = await getDocs(docRef);
      const docs = dataCol.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
      setShow(docs);
    } catch (error) {
      alert('Error occurred');
      console.error('Error fetching documents: ', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Enter your note"
        />
        <button type="submit">Send doc</button>
        <button type="button" onClick={showDoc}>Add doc</button>
      </form>
      {show.map((doc) => (
        <div key={doc.id}>
          <p>{doc.data.infoText}</p>
          <p>ID: {doc.id}</p>
        </div>
      ))}
    </div>
  );
}

export default F;
