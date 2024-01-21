'use client'
import { Package } from '@/types/package'
import { useState, useEffect, useRef, ChangeEvent } from 'react'
import axios from 'axios'
import usePengembalianState from '@/hooks/usePengembalianState'
import { calculateDateDifference } from '@/utils/hitungJarakTanggal'
import useStatisticState from '@/hooks/useStatisticState'
import useInitStates from '@/hooks/useInitStates'
import { hitungDenda } from '@/utils/hitungDenda'
import useBukuState from '@/hooks/useBukuState'
import { TBuku } from '@/types/buku'
import { Dropdown } from 'flowbite-react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { TLaporanPengunjungByKelas } from '@/types/laporan'
import useCredential from '@/hooks/useCredential'

const TableLaporanPeminjaman = () => {
  // State
  const [dataLaporan, setDataLaporan] = useState<TLaporanPengunjungByKelas>()

  //   initial data
  useEffect(() => {
    axios.get('/api/laporan').then((dataLaporanPengunjungByKelas: any) => {
      setDataLaporan(
        dataLaporanPengunjungByKelas?.data?.data as TLaporanPengunjungByKelas,
      )
    })
  }, [])
  console.log({ dataLaporan })

  return (
    <>
      {/* SMA */}
      {dataLaporan &&
        Object.entries(dataLaporan).map(([month, values], index) => (
          <DataTable key={index} month={month} data={values} />
        ))}

      {/* SMP */}

      {/* <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto  ">
          <div className="flex items-center justify-between pb-6 px-4 md:px-6 xl:px-7.5 border-b-[1px]">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Data Peminjam Siswa / Siswi SMP
            </h4>
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Januari
            </h4>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[150px] py-3 px-4 font-medium text-black dark:text-white xl:pl-11">
                  No
                </th>
                <th className="min-w-[150px] py-3 px-4 font-medium text-black dark:text-white">
                  Kelas
                </th>
                <th className="min-w-[150px] py-3 px-4 font-medium text-black dark:text-white">
                  Jumlah Siswa / Siswi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">1</h5>
                </td>
                <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">Kelas VII</p>
                </td>
                <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">218</p>
                </td>
              </tr>

              <tr>
                <td className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">2</h5>
                </td>
                <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">Kelas VIII</p>
                </td>
                <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">218</p>
                </td>
              </tr>

              <tr>
                <td className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">3</h5>
                </td>
                <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">Kelas IX</p>
                </td>
                <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">218</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  )
}

interface MonthlyData {
  [key: string]: {
    [tingkat: string]: number
  }
}
const DataTable = ({ month, data }: { month: string; data: MonthlyData }) => {
  const { tipePelajar } = useCredential()

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto  ">
        <div className="flex items-center justify-between pb-6 px-4 md:px-6 xl:px-7.5 border-b-[1px]">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Data Peminjam Siswa / Siswi {tipePelajar}
          </h4>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {month}
          </h4>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] py-3 px-4 font-medium text-black dark:text-white xl:pl-11">
                No
              </th>
              <th className="min-w-[150px] py-3 px-4 font-medium text-black dark:text-white">
                Kelas
              </th>
              <th className="min-w-[150px] py-3 px-4 font-medium text-black dark:text-white">
                Jumlah Siswa / Siswi
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.keys(data).map((kelas, key1) =>
                Object.keys(data[kelas]).map((tingkat, key2) => {
                  return (
                    <tr key={`${kelas}-${tingkat}`}>
                      <td className="border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {key1 === 0 ? key2 + 1 : key2 + 4}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          Kelas {tingkat}{' '}
                          {kelas.includes('IPA') ? 'IPA' : 'IPS'}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {data[kelas][tingkat]}
                        </p>
                      </td>
                    </tr>
                  )
                }),
              )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableLaporanPeminjaman
