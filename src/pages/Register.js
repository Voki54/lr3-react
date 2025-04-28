import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux_components/users/userThunk';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../account/AuthContext';
import AuthForm from '../account/AuthForm';

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
  }, [user, navigate, login]);

  const handleRegister = (formData) => {
    dispatch(registerUser(formData));
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
