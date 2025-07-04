import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabaseClient'

export default function AddPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    contact: '',
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [listingId, setListingId] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const pin = generatePin()
    const { data, error } = await supabase
      .from('listings')
      .insert([{ ...form, pin_code: pin }])
      .select()

    if (error || !data) {
      setError('Ошибка при отправке')
    } else {
      setSuccess(true)
      setPinCode(pin)
      setListingId(data[0].id)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-10 px-4">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Добавить объявление</h1>
          {success ? (
            <div className="text-center">
              <p className="text-green-600 mb-4">Объявление добавлено!</p>
              <p className="text-gray-700">Ваш код для управления: <span className="font-mono font-bold">{pinCode}</span></p>
              {listingId && (
                <p className="text-gray-700 mt-2">ID объявления: <span className="font-mono font-bold">{listingId}</span></p>
              )}
              <p className="text-sm text-gray-500 mt-2">Сохрани код и ID — они потребуются для редактирования</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input name="title" value={form.title} onChange={handleChange} type="text" placeholder="Заголовок" className="w-full border p-3 rounded-xl" required />
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Описание" className="w-full border p-3 rounded-xl min-h-[100px]" required />
              <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="Цена (€)" className="w-full border p-3 rounded-xl" />
              <input name="location" value={form.location} onChange={handleChange} type="text" placeholder="Локация" className="w-full border p-3 rounded-xl" />
              <input name="contact" value={form.contact} onChange={handleChange} type="text" placeholder="Email или телефон" className="w-full border p-3 rounded-xl" />
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">Опубликовать</button>
            </form>
          )}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      </main>
      <Footer />
    </div>
  )
}