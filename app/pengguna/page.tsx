import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import TablePengguna from '@/components/Tables/TablePengguna'

export default function buku() {
  return (
    <>
      <Breadcrumb pageName="Peminjaman" />
      <div>
        <TablePengguna />
      </div>
    </>
  )
}
