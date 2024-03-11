import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotesPosted = () => {
  const [notes, setNotes] = useState([]);

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
  }, []); // Empty dependency array

  return (
    <div>
      <h2>All Notes</h2>
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
  );
};

export default NotesPosted;
