import React, { useState } from 'react';
import { db } from '../firebase/Firebase'; // Adjust the import path according to your project structure
import {
  collection,
  getDocs,
  addDoc
}
from "firebase/firestore"

function F() {
  const [text, setText] = useState('');
  const [show , setShow] = useState([]);
  const showDoc = async () => {
    const doRef = collection(db , 'notes');

try{
  alert('show all doc');
  await addDoc(doRef, { infoText: text });
  setText('');
  console.log("Document successfully written!");
}
catch{
  alert('error')
}
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const docRef = collection(db , 'notes');

   try{
       // Add a new document with the input text

    const dataCol = await getDocs(docRef);

    dataCol.forEach((doc) => {
      const docs = dataCol.docs.map(doc => ({ id: doc.id, data: doc.data() }));
      setShow(docs);
    })
  }catch{
    alert('error happening')
   }
    

  }

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
        {text}
        <button onClick={showDoc}>Add doc</button>
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







// import React, { useState } from 'react';
// import { db } from '../firebase/Firebase'; // Adjust the import path according to your project structure
// import { collection, getDocs } from 'firebase/firestore';

// function F() {
//   const [text, setText] = useState('');

//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const docRef = collection(db, 'notes');

//     try {
//       const docsSnapshot = await getDocs(docRef);
//       docsSnapshot.forEach(doc => {
//         console.log(doc.data());
//         console.log(doc.id);
//       });
//     } catch (error) {
//       console.error("Error fetching documents: ", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Enter your note"
//         />
//         <button type="submit">Send Data</button>
//       </form>
//     </div>
//   );
// }

// export default F;
