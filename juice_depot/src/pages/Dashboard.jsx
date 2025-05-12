import { useNavigate } from 'react-router-dom';
import '../components/styles/dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className='dashboard'>
      <h2>Welcome to the JUICE DEPOT</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
