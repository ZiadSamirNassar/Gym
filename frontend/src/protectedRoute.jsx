import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedType, children }) => {
  const userType = localStorage.getItem("type");

  //if (userType !== allowedType) {
  //  return <Navigate to="/login" replace />;
  //}

  return children;
};

export default ProtectedRoute;