import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/styles/signup.css'

function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '', usertype: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
     const response =  await axios.post('http://localhost:3000/api/users/register', formData);
     const user = response.data[0];
     localStorage.setItem('user', JSON.stringify(user));
     
      alert("User created successfully");
      navigate('/');
    } catch (err) {
      alert("User already exists",err);
    }
  };

  return (
    <form className='signup-form' onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={e => setFormData({ ...formData, username: e.target.value })} required/>
      <input type="password" placeholder="Password" onChange={e => setFormData({ ...formData, password: e.target.value })} required/>
      <select placeholder="User Type" onChange={e => setFormData({ ...formData, usertype: e.target.value })} required>
        <option>select user type</option>
        <option>Owner</option>
        <option>Worker</option>
      </select>
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
