import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ id: null, firstname: null, lastname: null });
  const navigate = useNavigate();

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

      // Redirect to GetUserNotes with the userId
      navigate(`/getusernotes/${response.data.id}`);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Notes App</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>First Name</label>
        <input type="text" id="firstName" style={styles.input} />
        <label style={styles.label}>Last Name</label>
        <input type="text" id="lastName" style={styles.input} />
        <button type="submit" id="register" style={styles.button}>
          Register
        </button>
      </form>

      {user.id && (
        <div style={styles.userInfo}>
          <h3>User Registered</h3>
          <p>ID: {user.id}</p>
          <p>First Name: {user.firstname}</p>
          <p>Last Name: {user.lastname}</p>
        </div>
      )}
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
  heading: {
    fontFamily: 'Roboto, sans-serif', 
    marginBottom: '20px',
  },
  form: {
    fontFamily: 'Roboto, sans-serif', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '300px',
    width: '100%',
  },
  label: {
    fontFamily: 'Roboto, sans-serif', 
    marginBottom: '5px',
  },
  input: {
    fontFamily: 'Roboto, sans-serif', 
    marginBottom: '15px',
    padding: '8px',
    width: '100%',
  },
  button: {
    fontFamily: 'Roboto, sans-serif',   
    background: '#4caf50',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  userInfo: {
    fontFamily: 'Roboto, sans-serif', 
    marginTop: '20px',
    textAlign: 'center',
  },
};

export default Register;
