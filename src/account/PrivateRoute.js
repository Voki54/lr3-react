import { useAuth } from "./AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {  
    const { authUser, isLoading } = useAuth();

    if (isLoading) {
      return <div>Загрузка...</div>;
    }
  
    return authUser ? <Outlet/> : <Navigate to="/" />;
  };
  
export default PrivateRoute;
