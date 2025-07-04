import Head from 'next/head';

export default function AddPage() {
  return (
    <>
      <Head>
        <title>Добавить объявление — Domio</title>
      </Head>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Добавить объявление</h1>
          <form className="space-y-4">
            <input type="text" placeholder="Заголовок" className="w-full border p-3 rounded-xl" />
            <textarea placeholder="Описание" className="w-full border p-3 rounded-xl min-h-[100px]" />
            <input type="number" placeholder="Цена (€)" className="w-full border p-3 rounded-xl" />
            <input type="email" placeholder="Ваш Email" className="w-full border p-3 rounded-xl" />
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">Опубликовать</button>
          </form>
        </div>
      </div>
    </>
  );
}