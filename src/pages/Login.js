import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../account/AuthForm';
import { userActions } from '../redux_components/entities/users/userSlice';
import { useEffect } from 'react';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate('/products');
    }
  }, [user, navigate]);

  const handleLogin = (formData) => {
    dispatch(userActions.loginRequest(formData));
  };

  return (
    <AuthForm
      title="Вход"
      onSubmit={handleLogin}
      buttonText="Войти"
      linkText="Нет аккаунта? Зарегистрируйтесь"
      linkPath="/register"
      loading={loading}
      error={error}
    />
  );
}

export default Login;
