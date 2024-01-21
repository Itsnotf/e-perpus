import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import TableAnggota from '@/components/Tables/TableAnggota'

export default function buku() {
  return (
    <>
      <Breadcrumb pageName="Anggota" />
      <div>
        <TableAnggota />
      </div>
    </>
  )
}
