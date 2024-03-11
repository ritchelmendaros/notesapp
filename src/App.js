import React from 'react';
import Register from './pages/NewUser';
import NewNote from './pages/NewNote';
import GetUserNotes from './pages/GetUserNotes';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/newnote/:userId" element={<NewNote />} />
      <Route path="/getusernotes/:userId" element={<GetUserNotes />} />
    </Routes>
  );
}

export default App;
