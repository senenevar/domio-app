export default function Header() {
  return (
    <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-700">Domio</div>
      <nav className="space-x-4">
        <a href="/" className="text-gray-700 hover:text-blue-700">Главная</a>
        <a href="/add" className="text-gray-700 hover:text-blue-700">Добавить</a>
      </nav>
    </header>
  );
}