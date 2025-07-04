import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { toast } from 'react-toastify'

export default function EditPage() {
  const router = useRouter()
  const { id } = router.query

  const [listing, setListing] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [pinCode, setPinCode] = useState('')
  const [authPassed, setAuthPassed] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    async function fetchListing() {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single()
      if (error) {
        toast.error('Ошибка при загрузке объявления')
        setLoading(false)
        return
      }
      setListing(data)
      setLoading(false)
    }
    fetchListing()
  }, [id])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setListing({ ...listing, [e.target.name]: e.target.value })
  }

  function handlePinCheck() {
    if (pinCode === listing.pin_code) {
      setAuthPassed(true)
      setError('')
    } else {
      setError('Неверный пин-код')
      toast.error('Неверный пин-код')
    }
  }

  async function handleSave() {
    if (!authPassed) {
      setError('Введите правильный пин-код для сохранения')
      toast.error('Введите правильный пин-код для сохранения')
      return
    }
    const { error } = await supabase
      .from('listings')
      .update(listing)
      .eq('id', id)
    if (error) {
      setError('Ошибка при сохранении')
      toast.error('Ошибка при сохранении')
      return
    }
    toast.success('Объявление сохранено!')
    router.push('/listings') // редирект после сохранения
  }

  if (loading) return <p>Загрузка...</p>
  if (!listing) return <p>Объявление не найдено</p>

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Редактирование объявления</h1>

      {!authPassed && (
        <>
          <p>Введите пин-код для редактирования:</p>
          <input
            type="text"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            maxLength={6}
            style={{ padding: 8, width: '100%', marginBottom: 10 }}
          />
          <button onClick={handlePinCheck} style={{ padding: '8px 16px' }}>
            Подтвердить
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}

      {authPassed && (
        <>
          <input
            name="title"
            value={listing.title}
            onChange={handleChange}
            placeholder="Заголовок"
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
          />
          <textarea
            name="description"
            value={listing.description}
            onChange={handleChange}
            placeholder="Описание"
            rows={4}
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
          />
          <input
            name="price"
            value={listing.price}
            onChange={handleChange}
            placeholder="Цена"
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
          />
          <input
            name="location"
            value={listing.location}
            onChange={handleChange}
            placeholder="Локация"
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
          />
          <input
            name="contact"
            value={listing.contact}
            onChange={handleChange}
            placeholder="Контакт"
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
          />

          <button onClick={handleSave} style={{ padding: '10px 20px', fontSize: 16 }}>
            Сохранить изменения
          </button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}
    </div>
  )
}
