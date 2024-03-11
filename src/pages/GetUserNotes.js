import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetUserNotes = () => {
  const [userNotes, setUserNotes] = useState([]);

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const response = await axios.get('http://hyeumine.com/mynotes.php?id=35899');

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
  }, []); 

  return (
    <div>
      <h2>User Notes</h2>
      {userNotes.length === 0 ? (
        <p>No notes available for this user.</p>
      ) : (
        <ul>
          {userNotes.map((note) => (
            <li key={note.id}>{note.note}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetUserNotes;
