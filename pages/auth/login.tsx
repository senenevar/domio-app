import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Auth.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/account');
    }
  };

  return (
    <div className={styles.container}>
      <a href="/" className={styles.logo}>Domio</a>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2>Вход</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.passwordField}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>👁️</button>
        </div>
        <button type="submit">Войти</button>
        <p className={styles.link}><a href="/auth/reset-password">Забыли пароль?</a></p>
        <p className={styles.link}>Нет аккаунта? <a href="/auth/register">Регистрация</a></p>
      </form>
    </div>
  );
}
