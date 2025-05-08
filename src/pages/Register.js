// Register.js
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../account/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../account/AuthForm';
import { userActions } from '../redux_components/entities/users/userSlice';
import { useEffect } from 'react';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      login(user);
      navigate('/products');
    }
  }, [user, login, navigate]);

  const handleRegister = (formData) => {
    dispatch(userActions.registerRequest(formData));
  };

  return (
    <AuthForm
      title="Регистрация"
      onSubmit={handleRegister}
      buttonText="Зарегистрироваться"
      linkText="Есть аккаунт? Войти"
      linkPath="/login"
      loading={loading}
      error={error}
    />
  );
}

export default Register;
