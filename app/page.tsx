export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">Domio</h1>
      <h2 className="text-2xl font-semibold mb-2">Твой цифровой старт</h2>
      <p className="mb-4">Создаем современные веб-решения под ключ</p>
      <button className="bg-black text-white px-4 py-2 rounded">Связаться</button>

      <section className="mt-10">
        <h3 className="text-xl font-bold">О нас</h3>
        <p className="mt-2">Domio — команда, объединённая идеей делать веб-пространство красивым и функциональным.</p>
      </section>

      <section className="mt-6">
        <h3 className="text-xl font-bold">Услуги</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Сайты</strong>: Лендинги, корпоративные и e-commerce решения</li>
          <li><strong>UI/UX</strong>: Адаптивный, удобный и современный дизайн</li>
          <li><strong>Поддержка</strong>: Обновления, сопровождение, аналитика</li>
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="text-xl font-bold">Контакты</h3>
        <p className="mt-2">Почта: <a href="mailto:hello@domio.lv" className="text-blue-500">hello@domio.lv</a></p>
        <p className="mt-1 text-sm text-gray-500">© 2025 domio.lv</p>
      </section>
    </main>
  );
}