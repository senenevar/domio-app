import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import styles from '../../styles/Auth.module.css';
import FormInputPassword from '../../components/FormInputPassword';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else router.push('/account');
  };

  return (
    <div className={styles.container}>
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <FormInputPassword
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div style={{ marginTop: '0.5rem' }}>
          <a href="/auth/reset-password" style={{ fontSize: '0.875rem', color: '#2563eb' }}>Забыли пароль?</a>
        </div>
        <button className={styles.button} type="submit">Войти</button>
      </form>
    </div>
    );
}