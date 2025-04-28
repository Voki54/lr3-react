import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux_components/users/userThunk';
import { useAuth } from '../account/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../account/AuthForm';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      login(user);
      navigate('/products');
    }
  }, [user, navigate, login]);

  const handleLogin = async (formData) => {
    const resultAction = await dispatch(loginUser(formData));
    if (loginUser.fulfilled.match(resultAction)) {
      login(resultAction.payload);
    }
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
