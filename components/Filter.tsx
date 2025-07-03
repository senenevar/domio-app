export default function Filter() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <input placeholder="Город" className="border p-2 mr-2" />
      <input placeholder="Цена до (€)" className="border p-2 mr-2" />
      <select className="border p-2">
        <option>Тип</option>
        <option>Аренда</option>
        <option>Продажа</option>
      </select>
    </div>
  )
}