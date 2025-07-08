import AuthWrapper from "@/components/AuthWrapper";

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import styles from '@/styles/Auth.module.css'

export default function UpdatePasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Пароль успешно обновлён. Перенаправляем на вход...')
      setTimeout(() => router.push('/auth/login'), 2000)
    }
  }

  return (
    <AuthWrapper>
    <div className={styles.authContainer}>
      <div className={styles.formContainer}>
        <h2>Сброс пароля</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Новый пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Обновить пароль</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
    </AuthWrapper>
  )
}