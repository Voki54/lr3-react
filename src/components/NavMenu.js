import { Link } from "react-router-dom";
import { useAuth } from "../account/AuthContext";
import LogoutButton from './LogoutButton'

export const NavMenu = () => {
  const { authUser } = useAuth();

  return (
    <header>
        <h2>Канцтовары</h2>
        {authUser ? 
        <>
            <Link to="/">На главную</Link>|
            <Link to="/products">Товары</Link>|
            <Link to="/cart">Корзина</Link>|
            <Link to="/orders">Заказы</Link>|
            <LogoutButton />
            | Username - {authUser.username}
        </>
        :
            <Link to="/login">Войти</Link>
        }
        
    </header>
  );
}
