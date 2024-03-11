import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({ id: null, firstname: null, lastname: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstNameValue = document.getElementById('firstName').value;
    const lastNameValue = document.getElementById('lastName').value;

    try {
      const formData = new FormData();
      formData.append('firstname', firstNameValue);
      formData.append('lastname', lastNameValue);

      const response = await axios.post(
        'http://hyeumine.com/newuser.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUser(response.data); 
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <h2>Note App</h2>
      <label>First Name</label>
      <input type="text" id="firstName"></input>
      <label>Last Name</label>
      <input type="text" id="lastName"></input>
      <button id="register" onClick={handleSubmit}>
        Register
      </button>

      {user.id && (
        <div>
          <h3>User Registered</h3>
          <p>ID: {user.id}</p>
          <p>First Name: {user.firstname}</p>
          <p>Last Name: {user.lastname}</p>
        </div>
      )}
    </div>
  );
};

export default Register;
