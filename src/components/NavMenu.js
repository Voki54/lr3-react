import { Link } from "react-router-dom";
import LogoutButton from './LogoutButton';
import { useSelector } from 'react-redux';
import styles from './styles/NavMenu.module.css';

export const NavMenu = () => {
  const authUser = useSelector((state) => state.user.user);

  return (
    <header className={styles.header} role="banner">
      <nav className={styles.nav} aria-label="Главное меню">
      <Link to="/"><h2 className={styles.logo}>Канцтовары</h2></Link>
        <ul className={styles.navList}>
          {authUser ? (
            <>
              <li><Link to="/" className={styles.link}>На главную</Link></li>
              <li><Link to="/products" className={styles.link}>Товары</Link></li>
              <li><Link to="/cart" className={styles.link}>Корзина</Link></li>
              <li><Link to="/orders" className={styles.link}>Заказы</Link></li>
              <li><LogoutButton className={styles.link} /></li>
              <li className={styles.username}>Пользователь: {authUser.username}</li>
            </>
          ) : (
            <li><Link to="/login" className={styles.link}>Войти</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};
