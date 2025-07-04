import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ManageListing() {
  const [form, setForm] = useState({ id: '', pin: '' })
  const [listing, setListing] = useState<any>(null)
  const [error, setError] = useState('')
  const [step, setStep] = useState<'input' | 'edit'>('input')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const fetchListing = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', form.id)
      .eq('pin_code', form.pin)
      .single()

    if (error || !data) {
      setError('Не найдено. Проверь ID и PIN.')
    } else {
      setListing(data)
      setStep('edit')
    }
  }

  const updateListing = async () => {
    const { error } = await supabase
      .from('listings')
      .update(listing)
      .eq('id', listing.id)

    if (!error) alert('Сохранено ✅')
  }

  const deleteListing = async () => {
    const confirmed = confirm('Удалить объявление?')
    if (!confirmed) return
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', listing.id)
    if (!error) {
      alert('Удалено ✅')
      location.reload()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
          {step === 'input' && (
            <>
              <h1 className="text-2xl font-bold mb-4">Управление объявлением</h1>
              <input
                name="id"
                placeholder="ID объявления"
                value={form.id}
                onChange={handleChange}
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                name="pin"
                placeholder="PIN-код"
                value={form.pin}
                onChange={handleChange}
                className="w-full mb-4 p-2 border rounded"
              />
              <button onClick={fetchListing} className="w-full bg-blue-600 text-white py-2 rounded">Найти</button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </>
          )}

          {step === 'edit' && listing && (
            <>
              <h2 className="text-xl font-semibold mb-4">Редактировать</h2>
              <input
                value={listing.title}
                onChange={(e) => setListing({ ...listing, title: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
              />
              <textarea
                value={listing.description}
                onChange={(e) => setListing({ ...listing, description: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                value={listing.price}
                onChange={(e) => setListing({ ...listing, price: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                value={listing.location}
                onChange={(e) => setListing({ ...listing, location: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                value={listing.contact}
                onChange={(e) => setListing({ ...listing, contact: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              />
              <div className="flex justify-between">
                <button onClick={updateListing} className="bg-green-600 text-white px-4 py-2 rounded">Сохранить</button>
                <button onClick={deleteListing} className="bg-red-500 text-white px-4 py-2 rounded">Удалить</button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}