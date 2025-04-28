
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../redux_components/users/userThunk';
import { useAuth } from '../account/AuthContext';

function LogoutButton() {
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   logout();
  // };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      logout();
      navigate('/login');
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return <button onClick={handleLogout}>Выйти</button>;
}

export default LogoutButton;