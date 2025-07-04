export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center p-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Добро пожаловать в <span className="text-orange-500">Domio</span></h1>
        <p className="text-gray-600 text-lg mb-6">Ваш помощник в поиске недвижимости в Латвии</p>
        <a href="/add" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition">Добавить объявление</a>
      </div>
    </main>
  );
}