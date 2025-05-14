import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedType, children }) => {
  const userType = localStorage.getItem("type");

  // Check if the user type matches the allowed type
  if (userType !== allowedType) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;