import { Navigate } from "react-router-dom";
import { useDataContext } from "../context/data_context";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useDataContext();
  if (!isAuthenticated) {
    return <Navigate to="/"></Navigate>;
  }
  return children;
};

export default ProtectedRoute;
