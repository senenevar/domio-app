import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyForm from '../components/PropertyForm';

export default function AddPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-10 px-4">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Добавить объявление</h1>
          <PropertyForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}