import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
