
'use client'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function EditListingPage() {
  const router = useRouter()
  const { id } = router.query

  const [listing, setListing] = useState<any>(null)
  const [codeInput, setCodeInput] = useState('')
  const [authPassed, setAuthPassed] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    const fetchListing = async () => {
      const { data } = await supabase.from('listings').select('*').eq('id', id).single()
      if (data) setListing(data)
    }
    fetchListing()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setListing({ ...listing, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    const { error } = await supabase.from('listings').update(listing).eq('id', id)
    if (!error) alert('Объявление обновлено!')
  }

  const handleCodeCheck = () => {
    if (codeInput === listing.pin_code) {
      setAuthPassed(true)
      setError('')
    } else {
      setError('Неверный код. Попробуйте снова.')
    }
  }

  if (!listing) return <p className="p-6 text-center">Загрузка...</p>

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">Редактировать объявление #{listing.id}</h1>

        {!authPassed ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="mb-4">Введите 4-значный код, который вы получили при создании объявления:</p>
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              className="border p-2 w-1/2 rounded"
              maxLength={4}
            />
            <div className="mt-4">
              <button onClick={handleCodeCheck} className="bg-blue-600 text-white px-4 py-2 rounded">
                Проверить
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <input
              name="title"
              value={listing.title}
              onChange={handleChange}
              placeholder="Заголовок"
              className="w-full border p-2 rounded"
            />
            <textarea
              name="description"
              value={listing.description}
              onChange={handleChange}
              placeholder="Описание"
              className="w-full border p-2 rounded h-24"
            />
            <input
              name="price"
              value={listing.price}
              onChange={handleChange}
              placeholder="Цена"
              className="w-full border p-2 rounded"
            />
            <input
              name="location"
              value={listing.location}
              onChange={handleChange}
              placeholder="Локация"
              className="w-full border p-2 rounded"
            />
            <input
              name="contact"
              value={listing.contact}
              onChange={handleChange}
              placeholder="Контакт"
              className="w-full border p-2 rounded"
            />
            <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">
              Сохранить изменения
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
