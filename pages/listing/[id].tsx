import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import dynamic from 'next/dynamic'

// Динамический импорт Map с отключением SSR
const Map = dynamic(() => import('../../components/Map'), { ssr: false })

export default function ListingDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [listing, setListing] = useState<any>(null)

  useEffect(() => {
    if (!id) return
    supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => setListing(data))
  }, [id])

  if (!listing) return <p className="p-6 text-center">Загрузка...</p>

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-blue-900 mb-4">{listing.title}</h1>
          <p className="text-sm text-gray-500 mb-2">📍 {listing.location}</p>
          <p className="text-sm text-gray-600 mb-4">{listing.description}</p>
          <p className="text-lg font-semibold">💶 {listing.price} €</p>
          <div className="mt-6 p-4 border rounded-lg bg-blue-50 text-blue-900">
            <p><strong>Контакт:</strong> {listing.contact}</p>
          </div>

          {/* Передаем массив из одного объявления, т.к. Map ожидает listings[] */}
          <div className="mt-6" style={{ height: 400 }}>
            <Map listings={[listing]} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
