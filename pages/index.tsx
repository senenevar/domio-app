import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Найдите жильё с <span className="text-orange-500">Domio</span></h1>
          <p className="text-gray-600 text-lg mb-6">Поиск недвижимости по всей Латвии — быстро и удобно</p>
          <a href="/add" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition">Добавить объявление</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}