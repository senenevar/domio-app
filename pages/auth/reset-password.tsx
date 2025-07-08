import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Auth.module.css';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://www.domio.lv/auth/update-password',
    });
    if (error) {
      setError(error.message);
    } else {
      setMessage('Письмо отправлено! Проверьте почту.');
    }
  };

  return (
    <div className={styles.container}>
      <a href="/" className={styles.logo}>Domio</a>
      <form onSubmit={handleReset} className={styles.form}>
        <h2>Сброс пароля</h2>
        {error && <p className={styles.error}>{error}</p>}
        {message && <p className={styles.success}>{message}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Отправить</button>
        <p className={styles.link}><a href="/auth/login">Назад ко входу</a></p>
      </form>
    </div>
  );
}