import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import TableBuku from '@/components/Tables/TableBuku'

export default function buku() {
  return (
    <>
      <Breadcrumb pageName="Peminjaman" />
      <div>
        <TableBuku />
      </div>
    </>
  )
}
