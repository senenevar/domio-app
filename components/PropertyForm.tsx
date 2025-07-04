export default function PropertyForm() {
  return (
    <form className="space-y-4">
      <input type="text" placeholder="Заголовок" className="w-full border p-3 rounded-xl" />
      <textarea placeholder="Описание" className="w-full border p-3 rounded-xl min-h-[100px]" />
      <input type="number" placeholder="Цена (€)" className="w-full border p-3 rounded-xl" />
      <input type="email" placeholder="Ваш Email" className="w-full border p-3 rounded-xl" />
      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">Опубликовать</button>
    </form>
  );
}