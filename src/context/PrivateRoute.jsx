import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRoles = [] }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user || (requiredRoles.length > 0 && !requiredRoles.includes(user.Rol))) {
    navigate('/');
    return
  }

  return children;
};

export default PrivateRoute;