import { Link } from "react-router-dom";
import { useAuth } from "../account/AuthContext";

export const NavMenu = () => {
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };

  return (
    <header>
        <h2>Канцтовары</h2>
        {user ? 
        <>
            <Link to="/">На главную</Link>|
            <Link to="/products">Товары</Link>|
            <Link to="/cart">Корзина</Link>
            <button onClick={handleLogout }>Выйти</button>
            {user.username}
        </>
        :
            <Link to="/login">Войти</Link>
        }
        
    </header>
  );
}
