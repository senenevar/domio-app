"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import styles from "@/styles/Auth.module.css";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Пароли не совпадают");
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) {
      router.push("/auth/login");
    } else {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Domio</div>
      <form onSubmit={handleRegister}>
        <div className={styles.inputGroup}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.passwordField}>
            <input type={showPassword ? "text" : "password"} placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.toggleButton}>👁️</button>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <input type="password" placeholder="Повторите пароль" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </div>
        <button type="submit" className={styles.button}>Зарегистрироваться</button>
        <div className={styles.link}>
          Уже есть аккаунт? <Link href="/auth/login">Войти</Link>
        </div>
      </form>
    </div>
  );
}
