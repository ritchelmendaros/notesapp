import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const NewNote = () => {
  const { userId } = useParams();
  const [note, setNote] = useState('');
  const [createdNote, setCreatedNote] = useState(null);
  const navigate = useNavigate();

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

      // Navigate back to GetUserNotes after creating a new note
      navigate(`/getusernotes/${userId}`);
    } catch (error) {
      console.error('Error creating new note:', error);
    }
  };

  return (
    <div>
      <h2>Create New Note</h2>
      <form>
        <label>
          Note:
          <textarea value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
        <button type="button" onClick={handleCreateNote}>
          Create Note
        </button>
      </form>
    </div>
  );
};

export default NewNote;
