import AuthWrapper from "@/components/AuthWrapper";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import styles from '@/styles/Auth.module.css';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <AuthWrapper>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>Domio</Link>
        <h2 className={styles.title}>Войти в аккаунт</h2>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)} className={styles.eyeIcon}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          {errorMsg && <p className={styles.error}>{errorMsg}</p>}
          <button type="submit" className={styles.button}>Войти</button>
        </form>
        <p className={styles.switch}>
          Нет аккаунта? <Link href="/auth/register">Регистрация</Link>
        </p>
      </div>
    </AuthWrapper>
  );
}