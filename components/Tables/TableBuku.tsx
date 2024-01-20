'use client'
import { Package } from '@/types/package'
import { useState, useEffect, useRef, ChangeEvent } from 'react'
import axios from 'axios'
import { PeminjamanBody } from '@/types/request'
import usePengembalianState from '@/hooks/usePengembalianState'
import { calculateDateDifference } from '@/utils/hitungJarakTanggal'
import useStatisticState from '@/hooks/useStatisticState'
import useInitStates from '@/hooks/useInitStates'
import { hitungDenda } from '@/utils/hitungDenda'
import useBukuState from '@/hooks/useBukuState'
import { TBuku } from '@/types/buku'
import { Dropdown } from 'flowbite-react'
import { HiOutlineDotsVertical } from 'react-icons/hi'

const TableBuku = () => {
  // State
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState<'edit' | 'create'>('create')
  const bukuState = useBukuState()
  // const pengembalianState = usePengembalianState()
  // const statisticState = useStatisticState()

  const [input, setInput] = useState<TBuku>({
    idBuku: '',
    namaBuku: '',
    jenisBuku: '',
    jumlahBuku: 0,
    jumlahHilang: 0,
    jumlahRusakA: 0,
    jumlahRusakB: 0,
    keterangan: '',
    kodeBuku: '',
    tahunMasuk: new Date(),
  })

  // handler
  const handleOpen = () => {
    setOpen(!false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async (packageItem: TBuku) => {
    try {
      console.log({ packageItem })

      if (!confirm('Apakah anda yakin mau menghapus data buku ini?')) return

      const response = await axios.delete(`/api/buku/delete`, {
        headers: { 'Content-Type': 'application/json' },
        data: {
          idBuku: packageItem?.idBuku,
        },
      })

      bukuState.deleteData(packageItem?.idBuku)
      // pengembalianState.deleteData(packageItem?.idbuku as string)

      // useInitStates({ bukuState, bukuState, pengembalianState, statisticState })
      // hitungDenda(bukuState, statisticState)

      // location.reload()

      console.log(response.data)
      console.log('Data success deleted')
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error?.message)
        console.log('Data failed delete')
      }
    }
  }

  const handleSubmit = async () => {
    if (isEdit === 'create') {
      try {
        // Send data to Next.js API route
        const response = await axios.post('/api/buku/create', {
          ...input,
          idBuku: undefined,
        })

        // update state
        bukuState.addData(input)
        // pengembalianState.addData(formData)
        console.log('Data successfully submitted to API:', response.data)

        // ! bug button ga mau diklik, untuk sementara di refresh aja
        // useInitStates({ bukuState, pengembalianState, statisticState })
        // hitungDenda(bukuState, statisticState)

        // location.reload()
      } catch (error) {
        console.error('Error submitting data to API:', error)
      }
    }

    if (isEdit === 'edit') {
      try {
        // Send data to Next.js API route
        console.log({ input })

        const response = await axios.post('/api/buku/update', {
          idBuku: input.idBuku,
          data: { ...input, idBuku: undefined },
        })

        // update state
        const updatedData: TBuku[] = bukuState.data.map((buku) =>
          buku.idBuku === input.idBuku ? input : buku,
        )

        console.log({ updatedData })

        bukuState.setData(updatedData)
        // pengembalianState.addData(formData)
        console.log('Data successfully submitted to API:', response.data)

        // ! bug button ga mau diklik, untuk sementara di refresh aja
        // useInitStates({ bukuState, pengembalianState, statisticState })
        // hitungDenda(bukuState, statisticState)

        // location.reload()
      } catch (error) {
        console.error('Error submitting data to API:', error)
      }
    }
    handleClose()
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto  ">
        <div className="flex items-center justify-between pb-6 px-4 md:px-6 xl:px-7.5 border-b-[1px]">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Data Buku
          </h4>
          <button
            onClick={() => {
              setIsEdit('create')
              handleOpen()
            }}
            className="flex  justify-center rounded bg-primary p-3 font-medium border text-gray transition-colors focus:border-primary focus:border focus:bg-gray focus:text-primary"
          >
            Add Data
          </button>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Kode Buku
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Nama Buku
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Jenis Buku
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Jumlah Buku
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Jumlah Rusak (A)
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Jumlah Rusak (B)
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Jumlah Hilang
              </th>
              {/* <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Keterangan
              </th> */}
              {/* <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Tahun Masuk
              </th> */}
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bukuState.data.map((bookItem, key) => {
              return (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {bookItem.kodeBuku}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {bookItem.namaBuku}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {bookItem.jenisBuku}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {bookItem.jumlahBuku}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {bookItem.jumlahRusakA}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {bookItem.jumlahRusakB}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {bookItem.jumlahHilang}
                    </p>
                  </td>
                  {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {bookItem.keterangan}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {new Date(bookItem.tahunMasuk).toLocaleDateString(
                        'id-ID',
                      )}
                    </p>
                  </td> */}
                  {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      packageItem.status === "Selesai"
                        ? "text-success bg-success"
                        : packageItem.status === "Belum"
                        ? "text-danger bg-danger"
                        : "text-warning bg-warning"
                    }`}
                  >
                    {packageItem.status}
                  </p>
                </td> */}
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <Dropdown label={''} dismissOnClick={false}>
                      <Dropdown.Item
                        onClick={() => {
                          setInput(bookItem)
                          setOpen(true)
                          setIsEdit('edit')
                        }}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(bookItem)}>
                        Hapus
                      </Dropdown.Item>
                    </Dropdown>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {open && (
        <div>
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex flex-col justify-center items-center  ">
            <div className="ml-67 overflow-y-auto mt-25 h-[55%] w-[60%] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Data Buku
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Kode Buku
                  </label>
                  <input
                    value={input.kodeBuku}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setInput((prev) => ({
                        ...prev,
                        kodeBuku: e.target.value,
                      }))
                    }}
                    type="text"
                    placeholder="Kode Buku"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Nama Buku
                  </label>
                  <input
                    value={input.namaBuku}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setInput((prev) => ({
                        ...prev,
                        namaBuku: e.target.value,
                      }))
                    }}
                    type="text"
                    placeholder="Nama Buku"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Jenis Buku
                  </label>
                  <input
                    value={input.jenisBuku}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setInput((prev) => ({
                        ...prev,
                        jenisBuku: e.target.value,
                      }))
                    }}
                    type="text"
                    placeholder="Jenis Buku"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Jumlah Buku
                  </label>
                  <input
                    value={input.jumlahBuku}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setInput((prev) => ({
                        ...prev,
                        jumlahBuku: parseInt(e.target.value, 10),
                      }))
                    }}
                    type="number"
                    placeholder="Jumlah Buku"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Jumlah Rusak (A)
                  </label>
                  <input
                    value={input.jumlahRusakA}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setInput((prev) => ({
                        ...prev,
                        jumlahRusakA: parseInt(e.target.value, 10),
                      }))
                    }}
                    type="number"
                    placeholder="0"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Jumlah Rusak (B)
                  </label>
                  <input
                    value={input.jumlahRusakB}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setInput((prev) => ({
                        ...prev,
                        jumlahRusakB: parseInt(e.target.value, 10),
                      }))
                    }}
                    type="number"
                    placeholder="0"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Jumlah Hilang
                  </label>
                  <input
                    value={input.jumlahHilang}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setInput((prev) => ({
                        ...prev,
                        jumlahHilang: parseInt(e.target.value, 10),
                      }))
                    }}
                    type="number"
                    placeholder="0"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Keterangan
                  </label>
                  <input
                    value={input.keterangan}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setInput((prev) => ({
                        ...prev,
                        keterangan: e.target.value,
                      }))
                    }}
                    type="text"
                    placeholder="Keterangan"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-row justify-end gap-5 mb-6 mr-6">
                <button
                  onClick={handleClose}
                  className="flex w-[10%] justify-center rounded bg-primary p-3 font-medium border text-gray transition-colors focus:border-primary focus:border focus:bg-gray focus:text-primary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleSubmit()
                  }}
                  className="flex w-[10%] justify-center rounded bg-primary p-3 font-medium border text-gray transition-colors focus:border-primary focus:border focus:bg-gray focus:text-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TableBuku
