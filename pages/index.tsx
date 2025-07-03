// pages/index.tsx
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Domio – Недвижимость в Латвии</title>
        <meta name="description" content="Платформа для аренды и покупки недвижимости в Латвии. Просто, удобно, эффективно." />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
        <h1 className="text-5xl font-bold text-blue-800 mb-6 text-center">
          Найдите свою новую квартиру с <span className="text-orange-500">Domio</span>
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl">
          Удобный поиск, карта, фильтры, объявления от частных лиц и агентств. Платформа недвижимости для Латвии. Стартуем – скоро здесь появятся лучшие предложения!
        </p>

        <div className="mt-10 text-sm text-gray-500">
          🚧 MVP версия – в разработке. Следите за обновлениями!
        </div>
      </main>
    </>
  );
}
