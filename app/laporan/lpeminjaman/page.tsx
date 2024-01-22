import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import TableLaporanPeminjaman from '@/components/Tables/TableLaporanPeminjaman'

export default function laporan() {
  return (
    <>
      <Breadcrumb pageName="Laporan Peminjaman" />
      <div className="flex flex-col gap-7">
        <TableLaporanPeminjaman />
      </div>
    </>
  )
}
