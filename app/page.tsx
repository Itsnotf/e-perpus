import { Metadata } from 'next'
import TablePeminjaman from '@/components/Tables/TablePeminjaman'
import Cards from '@/components/Dashboard/Cards'

export const metadata: Metadata = {
  title: 'E - PERPUS',
  description: 'This is dashboard',
}

export default function Home() {
  return (
    <>
      <div className="flex justify-between mb-10">
        <Cards />
      </div>

      <div>
        <TablePeminjaman />
      </div>
    </>
  )
}
