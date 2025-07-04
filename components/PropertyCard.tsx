interface Props {
  title: string;
  description: string;
  price: number;
  location: string;
}

export default function PropertyCard({ title, description, price, location }: Props) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-blue-800">{title}</h2>
      <p className="text-gray-600 text-sm mb-2">{location}</p>
      <p className="text-gray-700 mb-3">{description}</p>
      <div className="text-right text-lg font-bold text-orange-500">{price} €</div>
    </div>
  );
}