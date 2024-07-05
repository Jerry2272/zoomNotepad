import { useState } from "react";

export default function EditableLine({ index, text, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newText.length < 10) {
      alert('Text must be at least 10 characters long.');
    } else {
      onSave(index, newText);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    onDelete(index);
  };

  const handleChange = (e) => {
    setNewText(e.target.value);
  };

  return (
    <div className="editable-line">
      {isEditing ? (
        <div className="editing flex justify-between items-center">
          <textarea
            value={newText}
            onChange={handleChange}
            className="textarea w-full h-[60vh] shadow px-4 py-2 block inputText"
          />
          <button onClick={handleSave} className="save-button bg-green-500 text-white px-4 py-2 rounded ml-2">
            Save
          </button>
        </div>
      ) : (
        <div>
          <p
            onClick={handleEdit}
            className="text-display w-[50%] h-[20px] bg-red-600 text-white rounded cursor-pointer"
            style={{ overflow: 'hidden' }}
          >
            {text}
          </p>
          <div className="flex justify-between mt-2">
            <button onClick={handleEdit} className="edit-button bg-blue-500 text-white px-4 py-2 rounded">
              Edit
            </button>
            <button onClick={handleDelete} className="delete-button bg-red-500 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
