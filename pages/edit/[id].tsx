
import { useRouter } from 'next/router'

export default function EditTestPage() {
  const { id } = useRouter().query

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 28 }}>🔧 Тест страницы редактирования</h1>
      <p>🆔 ID из URL: <strong>{id}</strong></p>
      <p>Если ты это видишь — маршрут работает ✅</p>
    </div>
  )
}
