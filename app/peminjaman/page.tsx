import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import CardDataStats from '@/components/CardDataStats'
import CheckboxTwo from '@/components/Checkboxes/CheckboxTwo'
import TablePeminjaman from '@/components/Tables/TablePeminjaman'

export default function peminjaman() {
  return (
    <>
      <Breadcrumb pageName="Peminjaman" />
      <div>
        <TablePeminjaman />
      </div>
    </>
  )
}
