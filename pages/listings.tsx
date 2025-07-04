import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Header from '../components/Header'
import Footer from '../components/Footer'

type Listing = {
  id: number
  title: string
  description: string
  price: string
  location: string
  contact: string
  property_type?: string
  deal_type?: string
  rooms?: string
  area?: string
  floor?: string
  total_floors?: string
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [filters, setFilters] = useState({
    location: '',
    property_type: '',
    deal_type: '',
    min_price: '',
    max_price: ''
  })

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const fetchListings = async () => {
      let query = supabase.from('listings').select('*').order('id', { ascending: false })

      if (filters.location) query = query.ilike('location', `%${filters.location}%`)
      if (filters.property_type) query = query.eq('property_type', filters.property_type)
      if (filters.deal_type) query = query.eq('deal_type', filters.deal_type)
      if (filters.min_price) query = query.gte('price', filters.min_price)
      if (filters.max_price) query = query.lte('price', filters.max_price)

      const { data } = await query
      if (data) setListings(data)
    }

    fetchListings()
  }, [filters])

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">Найти недвижимость</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-xl shadow mb-6">
            <input name="location" value={filters.location} onChange={handleFilterChange} type="text" placeholder="Локация" className="border p-2 rounded-xl" />
            <select name="property_type" value={filters.property_type} onChange={handleFilterChange} className="border p-2 rounded-xl">
              <option value="">Тип недвижимости</option>
              <option value="apartment">Квартира</option>
              <option value="house">Дом</option>
              <option value="land">Участок</option>
              <option value="commercial">Коммерческая</option>
            </select>
            <select name="deal_type" value={filters.deal_type} onChange={handleFilterChange} className="border p-2 rounded-xl">
              <option value="">Тип сделки</option>
              <option value="sale">Продажа</option>
              <option value="rent">Аренда</option>
            </select>
            <div className="flex gap-2">
              <input name="min_price" value={filters.min_price} onChange={handleFilterChange} type="number" placeholder="Цена от" className="border p-2 rounded-xl w-1/2" />
              <input name="max_price" value={filters.max_price} onChange={handleFilterChange} type="number" placeholder="до" className="border p-2 rounded-xl w-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                <h2 className="text-lg font-bold text-blue-800 mb-1">{listing.title}</h2>
                <p className="text-sm text-gray-600 mb-2 line-clamp-3">{listing.description}</p>
                <p className="text-sm font-medium">💶 {listing.price} €</p>
                <p className="text-xs text-gray-500 mt-1">📍 {listing.location}</p>
                <p className="text-xs text-gray-500">🏠 {listing.property_type} / {listing.deal_type}</p>
                <p className="text-xs text-gray-500">📐 {listing.area} м² | 🛏 {listing.rooms} | 🏢 {listing.floor}/{listing.total_floors}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}