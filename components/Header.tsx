import { useRouter } from 'next/router';

export default function Header() {
  const { pathname } = useRouter();

  const linkClass = (href: string) =>
    pathname === href
      ? 'text-sm font-medium text-blue-700'
      : 'text-sm font-medium text-gray-600 hover:text-blue-700';

  return (
    <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
      <a href="/" className="text-xl font-bold text-blue-700">Domio</a>
      <nav className="flex gap-4">
        <a href="/" className={linkClass('/')}>Главная</a>
        <a href="/listings" className={linkClass('/listings')}>Объявления</a>
        <a href="/add" className={linkClass('/add')}>Добавить</a>
      </nav>
    </header>
  );
}
