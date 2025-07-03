export default function ListingCard() {
  return (
    <div className="border rounded shadow p-4 bg-white">
      <img src="/placeholder.jpg" alt="Фото" className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-bold mt-2">Квартира в Риге</h3>
      <p>€500 / мес</p>
      <p className="text-sm text-gray-600">2 комнаты • Центр</p>
    </div>
  )
}