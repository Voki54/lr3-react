import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="auth-form-container">
      <h2>{title}</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя пользователя:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : buttonText}
        </button>
      </form>

      <p>
        <Link to={linkPath}>{linkText}</Link>
      </p>
    </div>
  );
}

export default AuthForm;
