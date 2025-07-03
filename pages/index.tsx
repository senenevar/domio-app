
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>Domio — цифровой старт</title>
      </Head>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Domio</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-20">
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-4">Твой цифровой старт</h2>
          <p className="text-lg text-gray-600 mb-6">Создаем современные веб-решения под ключ</p>
          <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">Связаться</button>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">О нас</h3>
          <p className="text-gray-700">Domio — команда, объединённая идеей делать веб-пространство красивым и функциональным. Работаем с вниманием к деталям.</p>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">Услуги</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-white shadow rounded">
              <h4 className="font-semibold text-lg mb-2">Сайты</h4>
              <p>Лэндинги, корпоративные и e-commerce решения</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h4 className="font-semibold text-lg mb-2">UI/UX</h4>
              <p>Дизайн, который работает — адаптивный, удобный, современный</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h4 className="font-semibold text-lg mb-2">Поддержка</h4>
              <p>Обновления, сопровождение, аналитика</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4">Контакты</h3>
          <p>Почта: <a href="mailto:hello@domio.lv" className="text-blue-600 underline">hello@domio.lv</a></p>
        </section>
      </main>

      <footer className="text-center py-6 text-sm text-gray-500 border-t">
        © 2025 domio.lv
      </footer>
    </div>
  )
}
