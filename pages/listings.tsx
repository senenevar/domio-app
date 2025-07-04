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
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([])

  useEffect(() => {
    const fetchListings = async () => {
      const { data } = await supabase.from('listings').select('*').order('id', { ascending: false })
      if (data) setListings(data)
    }
    fetchListings()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
              <h2 className="text-lg font-bold text-blue-800 mb-1">{listing.title}</h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">{listing.description}</p>
              <p className="text-sm font-medium">💶 {listing.price} €</p>
              <p className="text-xs text-gray-500 mt-1">📍 {listing.location}</p>
              <p className="text-xs text-gray-500">📞 {listing.contact}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}