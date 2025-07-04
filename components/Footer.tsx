export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10 py-4 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Domio. Все права защищены.
    </footer>
  );
}