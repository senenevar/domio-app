import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Header from '../components/Header'
import Footer from '../components/Footer'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// @ts-ignore
const Map = dynamic(() => import('../components/Map'), { ssr: false })

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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">Объявления + Карта</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {listings.map((listing) => (
                <Link key={listing.id} href={`/listing/${listing.id}`}>
                  <a className="block bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                    <h2 className="text-lg font-bold text-blue-800">{listing.title}</h2>
                    <p className="text-sm text-gray-600">{listing.description}</p>
                    <p className="text-sm mt-1">💶 {listing.price} €</p>
                    <p className="text-xs text-gray-500">📍 {listing.location}</p>
                  </a>
                </Link>
              ))}
            </div>
            <div className="h-[500px] rounded-xl overflow-hidden">
              <Map listings={listings} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}