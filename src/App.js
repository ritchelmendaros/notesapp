import React from 'react';
import Register from './pages/NewUser';
import NewNote from './pages/NewNote';
import GetUserNotes from './pages/GetUserNotes';
import NotesPosted from './pages/NotesPosted';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NotesPosted />} />
      <Route path="/newuser" element={<Register />} />
      <Route path="/newnote" element={<NewNote />} />
    </Routes>
  );
}

export default App;
