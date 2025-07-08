'use client'

import AuthWrapper from '@/components/AuthWrapper';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import styles from '@/styles/Auth.module.css';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) router.push('/');
    else alert(error.message);
  };

  return (
    <AuthWrapper>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>Domio</Link>
        <h2 className={styles.title}>Войти в аккаунт</h2>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="password">Пароль</label>
            <div className={styles.passwordField}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>Войти</button>
        </form>

        <div className={styles.links}>
          <Link href="/auth/reset-password">Забыли пароль?</Link>
          <Link href="/auth/register">Нет аккаунта? Регистрация</Link>
        </div>
      </div>
    </AuthWrapper>
  );
}
