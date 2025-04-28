import { useLoginMutation } from '../redux_components/users/userApi';
import { useAuth } from '../account/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../account/AuthForm';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginRequest, { isLoading, error }] = useLoginMutation();

  const handleLogin = async (formData) => {
    try {
      const user = await loginRequest(formData).unwrap();
      login(user);
      navigate('/products');
    } catch (err) {
      console.error('Ошибка входа:', err);
    }
  };

  return (
    <AuthForm
      title="Вход"
      onSubmit={handleLogin}
      buttonText="Войти"
      linkText="Нет аккаунта? Зарегистрируйтесь"
      linkPath="/register"
      loading={isLoading}
      error={error}
    />
  );
}

export default Login;
