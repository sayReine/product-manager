import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Report from './components/Report';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
// import Form from './components/product/Form';
import Product from './pages/Product';
import Stockin from './components/stock/Stockin';
import StockinPage from './pages/StockinPage';
import Stockout from './pages/Stockout';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
        <Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />

<Route path="/report" element={
  <ProtectedRoute allowedRoles={['Owner', 'Worker']}>
    <Report />
  </ProtectedRoute>
} />

<Route path="/product" element={
  <ProtectedRoute allowedRoles={['Owner']}>
    <Product />
  </ProtectedRoute>
} />

<Route path="/stockin" element={
  <ProtectedRoute allowedRoles={['Owner']}>
    <StockinPage />
  </ProtectedRoute>
} />

<Route path="/stockout" element={
  <ProtectedRoute allowedRoles={['Owner', 'Worker']}>
    <Stockout />
  </ProtectedRoute>
} />

      </Routes>
    </Router>
  );
}

export default App;
