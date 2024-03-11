import React, { useState } from 'react';
import axios from 'axios';

const NewNote = () => {
  const [userId, setUserId] = useState('');
  const [note, setNote] = useState('');
  const [createdNote, setCreatedNote] = useState(null);

  const handleCreateNote = async () => {
    try {
      const formData = new FormData();
      formData.append('id', userId);
      formData.append('note', note);

      const response = await axios.post(
        'http://hyeumine.com/newnote.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setCreatedNote(response.data);
    } catch (error) {
      console.error('Error creating new note:', error);
    }
  };

  return (
    <div>
      <h2>Create New Note</h2>
      <form>
        <label>
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <label>
          Note:
          <textarea value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
        <button type="button" onClick={handleCreateNote}>
          Create Note
        </button>
      </form>

      {createdNote && (
        <div>
          <h3>New Note Created</h3>
          <p>ID: {createdNote.id}</p>
          <p>User ID: {createdNote.user_id}</p>
          <p>Note: {createdNote.note}</p>
        </div>
      )}
    </div>
  );
};

export default NewNote;
