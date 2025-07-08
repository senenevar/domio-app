import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Auth.module.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      alert('Проверьте email для подтверждения.');
      router.push('/auth/login');
    }
  };

  return (
    <div className={styles.container}>
      <a href="/" className={styles.logo}>Domio</a>
      <form onSubmit={handleRegister} className={styles.form}>
        <h2>Регистрация</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Повторите пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Зарегистрироваться</button>
        <p className={styles.link}>Уже есть аккаунт? <a href="/auth/login">Вход</a></p>
      </form>
    </div>
  );
}