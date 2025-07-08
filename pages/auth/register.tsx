'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import styles from '@/styles/Auth.module.css';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError('Пароли не совпадают');
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else {
      setSuccess('Подтвердите email перед входом');
      setError('');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleRegister} className={styles.form}>
        <h1 className={styles.logo}>Domio</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.passwordField}>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <input
          type="password"
          placeholder="Повторите пароль"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <button type="submit">Зарегистрироваться</button>
        <div className={styles.link}>
          <Link href="/auth/login">Уже есть аккаунт? Войти</Link>
        </div>
      </form>
    </div>
  );
}
