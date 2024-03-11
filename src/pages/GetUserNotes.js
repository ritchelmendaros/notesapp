import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { AppBar, Toolbar, Typography } from '@mui/material';

const GetUserNotes = () => {
  const [userNotes, setUserNotes] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const response = await axios.get(`http://hyeumine.com/mynotes.php?id=${userId}`);

        if (response.data.notes && Array.isArray(response.data.notes)) {
          setUserNotes(response.data.notes);
        } else {
          console.error('Invalid data structure in the response:', response.data);
          setUserNotes([]);
        }
      } catch (error) {
        console.error('Error fetching user notes:', error);
        setUserNotes([]);
      }
    };

    fetchUserNotes();
  }, [userId]); 

  return (
    <div style={styles.container}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Notes</Typography>
        </Toolbar>
      </AppBar>

      <Link to={`/newnote/${userId}`} style={{ textDecoration: 'none' }}>
        <button style={styles.addButton}>
          <AddIcon style={{ marginRight: '5px' }} />
          Note
        </button>
      </Link>

      {userNotes.length === 0 ? (
        <p>No notes available for this user.</p>
      ) : (
        <div style={styles.notesContainer}>
          {userNotes.map((note, index) => (
            <div key={index} style={styles.noteBox}>
              <p>{note[0]}</p>
              <p style={styles.date}>{note[1]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  notesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  noteBox: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    margin: '10px',
    textAlign: 'center',
    maxWidth: '400px',
  },
  date: {
    color: '#888',
    fontSize: '14px',
  },
};

export default GetUserNotes;
