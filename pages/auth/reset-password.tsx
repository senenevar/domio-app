import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from '../../styles/Auth.module.css';
import ResetPasswordNotification from '../../components/ResetPasswordNotification';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://www.domio.lv/auth/update-password',
    });
    if (error) alert(error.message);
    else setSent(true);
  };

  return (
    <div className={styles.container}>
      <h2>Сброс пароля</h2>
      {sent ? (
        <ResetPasswordNotification />
      ) : (
        <form onSubmit={handleReset}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button className={styles.button} type="submit">Сбросить пароль</button>
        </form>
      )}
    </div>
  );
}