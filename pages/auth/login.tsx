import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import styles from '@/styles/Auth.module.css'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      setError(error.message)
    } else {
      router.push('/account')
    }
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>Domio</Link>
      <h2 className={styles.title}>Войти в аккаунт</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.passwordField}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className="button">Войти</button>
        <p className={styles.link}>
          Забыли пароль? <Link href="/auth/reset-password">Восстановить</Link>
        </p>
        <p className={styles.link}>
          Нет аккаунта? <Link href="/auth/register">Регистрация</Link>
        </p>
      </form>
    </div>
  )
}