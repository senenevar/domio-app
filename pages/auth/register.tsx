import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import styles from '../../styles/Auth.module.css';
import FormInputPassword from '../../components/FormInputPassword';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return alert('Пароли не совпадают');

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else {
      alert('Письмо с подтверждением отправлено');
      router.push('/auth/login');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegister}>
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
          placeholder="Пароль"
        />
        <FormInputPassword
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          placeholder="Повторите пароль"
        />
        <button className={styles.button} type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}