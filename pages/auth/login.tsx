"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import styles from "@/styles/Auth.module.css";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      router.push("/");
    } else {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Domio</div>
      <form onSubmit={handleLogin}>
        <div className={styles.inputGroup}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.passwordField}>
            <input type={showPassword ? "text" : "password"} placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.toggleButton}>👁️</button>
          </div>
        </div>
        <button type="submit" className={styles.button}>Войти</button>
        <div className={styles.link}>
          Нет аккаунта? <Link href="/auth/register">Регистрация</Link>
        </div>
        <div className={styles.link}>
          <Link href="/auth/forgot-password">Забыли пароль?</Link>
        </div>
      </form>
    </div>
  );
}
