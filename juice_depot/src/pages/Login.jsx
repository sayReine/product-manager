import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/styles/login.css';
function Login() {
  const [formData, setFormData] = useState({
     username: '', 
     password: '',
      usertype: ''
     });
  const navigate = useNavigate();
  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    //   console.log("formData", formData)
  }  

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log("formData", formData)
    try {
      const res = await axios.post('http://localhost:3000/api/users/login', formData);
      localStorage.setItem('user', JSON.stringify(res.data[0]));
      const user = res.data[0];
    //   console.log("Login response:", res.data);
      alert("Login successful");
      if (user.userType === 'Owner') {
        navigate('/report');
    }
    else if(user.userType === 'Worker') {
        navigate('/dashboard')
    }
      
    } catch (err) {
      alert("Invalid credentials:", err);
    }
  };

  return (
    <form className='login-form' onSubmit={handleLogin}>
      <h2>Login</h2>
      <input placeholder="Username" name='username' value={formData.username} onChange={handleChange}  required/>
      <input type="password" placeholder="Password" name='password' value ={formData.password}  onChange={handleChange}  required/>
      <select placeholder="User Type" name='usertype' value={formData.usertype} onChange={handleChange} required >
        <option>select User type</option>
        <option>Owner</option>
        <option>Worker</option>
      </select>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
