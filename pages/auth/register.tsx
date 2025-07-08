import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import styles from '../../styles/Auth.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (password !== repeatPassword) {
      setErrorMsg('Пароли не совпадают');
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setErrorMsg(error.message);
    else {
      setSuccessMsg('Проверьте почту для подтверждения');
      setEmail('');
      setPassword('');
      setRepeatPassword('');
    }
  };

  return (
    <div className={styles.container}>
      <a href="/" className={styles.logo}>Domio</a>
      <form onSubmit={handleRegister} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.passwordField}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.toggleBtn}>
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Повторите пароль"
          className={styles.input}
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.submitButton}>Зарегистрироваться</button>
        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        {successMsg && <p className={styles.success}>{successMsg}</p>}
        <p className={styles.link}>
          Уже есть аккаунт? <a href="/auth/login">Войти</a>
        </p>
      </form>
    </div>
  );
}
