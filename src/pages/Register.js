import { useRegisterMutation } from '../redux_components/users/userApi';
import { useAuth } from '../account/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../account/AuthForm';

function Register() {
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async (formData) => {
    try {
      const user = await register(formData).unwrap(); // unwrap автоматически выбрасывает ошибку если что-то не так
      login(user);
      navigate('/products');
    } catch (err) {
      console.error('Ошибка регистрации:', err);
    }
  };

  return (
    <AuthForm
      title="Регистрация"
      onSubmit={handleRegister}
      buttonText="Зарегистрироваться"
      linkText="Есть аккаунт? Войти"
      linkPath="/login"
      loading={isLoading}
      error={error?.data?.message || error?.error}
    />
  );
}

export default Register;
