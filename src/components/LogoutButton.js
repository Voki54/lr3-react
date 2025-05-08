import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../redux_components/entities/users/userSlice';
import styles from './styles/LogoutButton.module.css';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userActions.logoutRequest());
    navigate('/login');
  };

  return (
    <button 
      onClick={handleLogout} 
      className={styles.logoutButton} 
      aria-label="Выйти из аккаунта" 
    >
      Выйти
    </button>
  );
}

export default LogoutButton;
