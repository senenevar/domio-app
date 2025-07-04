import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';

export default function ListPage() {
  const listings = [
    {
      title: 'Уютная квартира в Риге',
      description: '2 комнаты, центр города, рядом с парком.',
      price: 650,
      location: 'Рига'
    },
    {
      title: 'Дом в Юрмале',
      description: '200 м², 2 этажа, 500 м до моря.',
      price: 320000,
      location: 'Юрмала'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-10 px-4">
        <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Объявления</h1>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item, index) => (
            <PropertyCard key={index} {...item} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}