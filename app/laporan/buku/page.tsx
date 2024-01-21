import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import TableLaporanBuku from '@/components/Tables/TableLaporanBuku'

export default function laporan() {
  return (
    <>
      <Breadcrumb pageName="Laporan Buku" />
      <div className="flex flex-col gap-7">
        <TableLaporanBuku />
      </div>
    </>
  )
}
