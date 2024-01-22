'use client'
import { useState, useEffect } from 'react'
import useBukuState from '@/hooks/useBukuState'
import { LaporanAtribut, TLaporanBuku } from '@/types/laporan'
import { filterLaporanBuku } from '@/utils/filter'

const TableLaporanBuku = () => {
  // State
  const [dataLaporanSMA, setDataLaporanSMA] = useState<TLaporanBuku>()
  const [dataLaporanSMP, setDataLaporanSMP] = useState<TLaporanBuku>()
  const [dataLaporanReferensi, setDataLaporanReferensi] = useState<
    TLaporanBuku
  >()
  const bukuState = useBukuState()

  useEffect(() => {
    const dataLaporanSMA = filterLaporanBuku(bukuState.data, 'SMA')
    const dataLaporanSMP = filterLaporanBuku(bukuState.data, 'SMP')
    const dataLaporanReferensi = filterLaporanBuku(bukuState.data, 'Referensi')

    setDataLaporanSMA(dataLaporanSMA)
    setDataLaporanSMP(dataLaporanSMP)
    setDataLaporanReferensi(dataLaporanReferensi)
  }, [bukuState.data])

  const headers = [
    'Jenis Buku',
    'Jumlah Buku',
    'Rusak A',
    'Rusak B',
    'Hilang',
    'Jumlah Sekarang',
    // 'Keterangan',
  ]

  const generateBookRows = (
    bookType: string,
    bookData: LaporanAtribut | undefined,
  ): string[] => {
    const defaultRow: string[] = [bookType]
    if (bookData) {
      defaultRow.push(
        bookData.jumlahBuku.toString(),
        bookData.rusakA.toString(),
        bookData.rusakB.toString(),
        bookData.hilang.toString(),
        bookData.jumlahSekarang.toString(),
        // '-',
      )
    } else {
      // If bookData is undefined, add placeholders or handle accordingly
      defaultRow.push('-', '-', '-', '-', '-', '-')
    }
    return defaultRow
  }

  const rowsSMA: { data: string[] }[] = [
    {
      data: generateBookRows(
        'Kumpulan Soal',
        dataLaporanSMA?.jumlahBukuNonFiksi?.kumpulanSoal,
      ),
    },
    {
      data: generateBookRows(
        'Buku Pelajaran',
        dataLaporanSMA?.jumlahBukuNonFiksi?.bukuPelajaran,
      ),
    },
    {
      data: generateBookRows(
        'Buku Paket',
        dataLaporanSMA?.jumlahBukuNonFiksi?.bukuPaket,
      ),
    },
    {
      data: generateBookRows(
        'Novel Cerpen',
        dataLaporanSMA?.jumlahBukuFiksi?.novelCerpen,
      ),
    },
    {
      data: generateBookRows(
        'Majalah',
        dataLaporanSMA?.jumlahBukuFiksi?.majalah,
      ),
    },
    {
      data: generateBookRows('Koran SMA', dataLaporanSMA?.koranSMA),
    },
    {
      data: generateBookRows('Total', dataLaporanSMA?.total),
    },
  ]

  const rowsSMP: { data: string[] }[] = [
    {
      data: generateBookRows(
        'Kumpulan Soal',
        dataLaporanSMP?.jumlahBukuNonFiksi?.kumpulanSoal,
      ),
    },
    {
      data: generateBookRows(
        'Buku Pelajaran',
        dataLaporanSMP?.jumlahBukuNonFiksi?.bukuPelajaran,
      ),
    },
    {
      data: generateBookRows(
        'Buku Paket',
        dataLaporanSMP?.jumlahBukuNonFiksi?.bukuPaket,
      ),
    },
    {
      data: generateBookRows(
        'Novel Cerpen',
        dataLaporanSMP?.jumlahBukuFiksi?.novelCerpen,
      ),
    },
    {
      data: generateBookRows(
        'Majalah',
        dataLaporanSMP?.jumlahBukuFiksi?.majalah,
      ),
    },
    {
      data: generateBookRows('Koran SMA', dataLaporanSMP?.koranSMA),
    },
    {
      data: generateBookRows('Total', dataLaporanSMP?.total),
    },
  ]

  const rowsReferensi: { data: string[] }[] = [
    {
      data: generateBookRows(
        'Kumpulan Soal',
        dataLaporanReferensi?.jumlahBukuNonFiksi?.kumpulanSoal,
      ),
    },
    {
      data: generateBookRows(
        'Buku Pelajaran',
        dataLaporanReferensi?.jumlahBukuNonFiksi?.bukuPelajaran,
      ),
    },
    {
      data: generateBookRows(
        'Buku Paket',
        dataLaporanReferensi?.jumlahBukuNonFiksi?.bukuPaket,
      ),
    },
    {
      data: generateBookRows(
        'Novel Cerpen',
        dataLaporanReferensi?.jumlahBukuFiksi?.novelCerpen,
      ),
    },
    {
      data: generateBookRows(
        'Majalah',
        dataLaporanReferensi?.jumlahBukuFiksi?.majalah,
      ),
    },
    {
      data: generateBookRows('Koran SMA', dataLaporanReferensi?.koranSMA),
    },
    {
      data: generateBookRows('Total', dataLaporanReferensi?.total),
    },
  ]

  return (
    <>
      <ReusableTable
        title1="Buku SMA"
        title2=""
        headers={headers}
        rows={rowsSMA}
      />
      <ReusableTable
        title1="Buku SMP"
        title2=""
        headers={headers}
        rows={rowsSMP}
      />
      <ReusableTable
        title1="Buku Referensi"
        title2=""
        headers={headers}
        rows={rowsReferensi}
      />
    </>
  )
}

interface TableProps {
  title1: string
  title2: string
  headers: string[]
  rows: { data: string[] }[]
}

const ReusableTable: React.FC<TableProps> = ({
  title1,
  title2,
  headers,
  rows,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="flex items-center justify-between pb-6 px-4 md:px-6 xl:px-7.5 border-b-[1px]">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title1}
          </h4>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title2}
          </h4>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="min-w-[150px] py-3 px-4 font-medium text-black dark:text-white text-center"
                  colSpan={header === 'Rusak' ? 2 : 0}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="">
                {row.data.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark "
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableLaporanBuku
