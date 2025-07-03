import Head from 'next/head'
import ListingCard from '../components/ListingCard'
import Filter from '../components/Filter'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Domio - Недвижимость в Латвии</title>
      </Head>
      <main className="p-4">
        <Filter />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <ListingCard />
          <ListingCard />
          <ListingCard />
        </div>
      </main>
    </div>
  )
}