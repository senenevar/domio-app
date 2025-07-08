'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import styles from '@/styles/Auth.module.css'
import AuthWrapper from '@/components/AuthWrapper'

export default function Register() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== repeatPassword) {
      setError('Пароли не совпадают')
      return
    }

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
    } else {
      router.push('/auth/login')
    }
  }

  return (
    <AuthWrapper>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>Domio</Link>
        <h2 className={styles.title}>Регистрация</h2>
        <form onSubmit={handleRegister} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className={styles.passwordField}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              value={password}
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className={styles.passwordField}>
            <input
              type={showRepeatPassword ? 'text' : 'password'}
              placeholder="Повторите пароль"
              value={repeatPassword}
              className={styles.input}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            >
              {showRepeatPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitButton}>
            Зарегистрироваться
          </button>

          <p className={styles.links}>
            Уже есть аккаунт? <Link href="/auth/login">Войти</Link>
          </p>
        </form>
      </div>
    </AuthWrapper>
  )
}
