import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

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
  }, [userId]); // Include userId in the dependency array

  return (
    <div>
      <h2>User Notes</h2>
      <Link to={`/newnote/${userId}`}>
        <button>Add New Note</button>
      </Link>

      {userNotes.length === 0 ? (
        <p>No notes available for this user.</p>
      ) : (
        <ul>
          {userNotes.map((note, index) => (
            <li key={index}>{note[0]} - {note[1]}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetUserNotes;
