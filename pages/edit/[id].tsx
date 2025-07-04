
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

export default function EditPage() {
  const { id } = useRouter().query

  if (!id) return <p>Загрузка...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Редактирование объявления</h1>
      <p>ID: <strong>{id}</strong></p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} }
}
