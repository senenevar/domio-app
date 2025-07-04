
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

export default function EditTestPage() {
  const { id } = useRouter().query

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 28 }}>🔧 Редактирование объявления</h1>
      <p>🆔 ID из URL: <strong>{id}</strong></p>
      <p>Если ты это видишь — маршрут работает ✅</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} }
}
