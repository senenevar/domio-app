import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Header() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
      <a href="/" className="text-xl font-bold text-blue-700">Domio</a>
      <nav className="flex gap-4">
        <a href="/" className="text-sm font-medium text-gray-600 hover:text-blue-700">Главная</a>
        <a href="/listings" className="text-sm font-medium text-gray-600 hover:text-blue-700">Объявления</a>
        <a href="/add" className="text-sm font-medium text-gray-600 hover:text-blue-700">Добавить</a>
        {session ? (
          <a href="/account" className="text-sm font-medium text-blue-700">Личный кабинет</a>
        ) : (
          <>
            <a href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-blue-700">Вход</a>
            <a href="/auth/register" className="text-sm font-medium text-gray-600 hover:text-blue-700">Регистрация</a>
          </>
        )}
      </nav>
    </header>
  );
}