import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthForm.module.css';

function AuthForm({ title, onSubmit, buttonText, linkText, linkPath, loading, error }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.container} role="main" aria-labelledby="auth-title">
      <h2 id="auth-title" className={styles.title}>{title}</h2>

      {error && (
        <div role="alert" aria-live="assertive" style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="username" className={styles.label}>Имя пользователя:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
            aria-required="true"
            className={styles.input}
          />
        </div>

        <div>
          <label htmlFor="password" className={styles.label}>Пароль:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            aria-required="true"
            className={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className={styles.button}
        >
          {loading ? 'Загрузка...' : buttonText}
        </button>
      </form>

      <p className={styles.linkBlock}>
        <Link to={linkPath} className={styles.link}>{linkText}</Link>
      </p>
    </div>
  );
}

export default AuthForm;
