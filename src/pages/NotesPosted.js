import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'; 

const NotesPosted = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://hyeumine.com/notesposted.php', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
        setNotes(response.data.notes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleCreateUserClick = () => {
    navigate('/newuser');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
          <div style={{ marginLeft: 'auto' }}>
            <IconButton color="inherit" onClick={handleCreateUserClick}>
              <AddIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: '64px' }}>
        {notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
          <ul>
            {notes.map((note, index) => (
              <li key={index}>
                <strong>Note:</strong> {note.note}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotesPosted;
