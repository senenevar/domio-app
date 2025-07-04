import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ListingPage() {
  const router = useRouter();
  const { id } = router.query;

  const mock = {
    title: 'Просторная квартира в Даугавпилсе',
    description: '3 комнаты, тихий район, балкон, свежий ремонт.',
    price: 85000,
    location: 'Даугавпилс',
    contact: 'test@example.com'
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold text-blue-800 mb-2">{mock.title}</h1>
          <p className="text-gray-500 text-sm mb-1">Локация: {mock.location}</p>
          <p className="text-gray-700 mb-4">{mock.description}</p>
          <div className="text-xl font-bold text-orange-500 mb-4">{mock.price} €</div>
          <div className="text-sm text-gray-600">Контакт: {mock.contact}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}