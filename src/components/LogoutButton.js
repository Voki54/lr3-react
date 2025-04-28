import { useNavigate } from "react-router-dom";
import { useAuth } from '../account/AuthContext';

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();               
    navigate('/login');
  };

  return <button onClick={handleLogout}>Выйти</button>;
}

export default LogoutButton;
