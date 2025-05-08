import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './styles/Home.module.css';

export default function Home() {
  const authUser = useSelector((state) => state.user.user);

  return (
    <main className={styles.main} role="main" aria-labelledby="home-title">
      <h1 id="home-title" className={styles.title}>Добро пожаловать в магазин канцелярии!</h1>
      <p className={styles.subtitle}>Всё для офиса, школы и творчества — в одном месте.</p>
      
      {authUser && (
        <div className={styles.buttons}>
          <Link to="/products" className={styles.button} aria-label="Перейти к списку товаров">Перейти к товарам</Link>
          
            <Link to="/orders" className={styles.button} aria-label="Посмотреть мои заказы">Мои заказы</Link>
        </div>
      )}

      <section className={styles.features} aria-label="Преимущества магазина">
        <div className={styles.feature}>
          <h2>Быстрая доставка</h2>
          <p>Оперативная доставка по всей стране прямо до двери.</p>
        </div>
        <div className={styles.feature}>
          <h2>Широкий ассортимент</h2>
          <p>Более 5000 товаров от лучших производителей.</p>
        </div>
        <div className={styles.feature}>
          <h2>Поддержка 24/7</h2>
          <p>Мы всегда на связи, чтобы помочь вам.</p>
        </div>
      </section>
    </main>
  );
}
