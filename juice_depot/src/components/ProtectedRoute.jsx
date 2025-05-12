// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/" />;
  }

  // If allowedRoles is provided, check if user role is allowed
  if (allowedRoles && !allowedRoles.includes(user.userType)) {
    console.log("User role:", user.role);
    return <Navigate to="/dashboard" />; // or a "Not Authorized" page
  }

  return children;
}
