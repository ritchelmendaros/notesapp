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

      navigate(`/getusernotes/${userId}`);
    } catch (error) {
      console.error('Error creating new note:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>Create New Note</h2>
      <form style={styles.form}>
        <label style={styles.label}>
          <textarea style={styles.textarea} value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
        <button type="button" onClick={handleCreateNote} style={styles.button}>
          Create Note
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  form: {
    fontFamily: 'Roboto, sans-serif',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '500px',
    width: '100%',
    color: '#7986C3',
  },
  h2: {
    color: '#7986C3', 
  },
  label: {
    fontFamily: 'Roboto, sans-serif',
    marginBottom: '5px',
  },
  textarea: {
    fontFamily: 'Roboto, sans-serif',
    marginBottom: '15px',
    border: '3px solid #7986C3',
    borderRadius: '8px',
    padding: '8px',
    width: '100%',
    height: '70px',
    color: '#7986C3',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  button: {
    fontFamily: 'Roboto, sans-serif',
    background: '#7986C3',
    fontSize: '15px',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'center',
  },
};

export default NewNote;
