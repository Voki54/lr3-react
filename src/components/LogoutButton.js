import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../redux_components/entities/users/userSlice';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userActions.logoutRequest());
    navigate('/login');
  };

  return <button onClick={handleLogout}>Выйти</button>;
}

export default LogoutButton;
