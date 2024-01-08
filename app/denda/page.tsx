import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import TableDenda from '@/components/Tables/TableDenda'
import React from 'react'

export default function denda() {
  return (
    <>
      <Breadcrumb pageName="Denda" />
      <div>
        <TableDenda />
      </div>
    </>
  )
}
