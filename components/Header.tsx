import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Header() {
  const { pathname } = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

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
        {user ? (
          <a href="/account" className={linkClass('/account')}>Личный кабинет</a>
        ) : (
          <a href="/auth/login" className={linkClass('/auth/login')}>Вход</a>
        )}
      </nav>
    </header>
  );
}