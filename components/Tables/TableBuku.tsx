'use client'
import { Package } from '@/types/package'
import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MouseEventHandler,
} from 'react'
import axios from 'axios'
import usePengembalianState from '@/hooks/usePengembalianState'
import { calculateDateDifference } from '@/utils/hitungJarakTanggal'
import useStatisticState from '@/hooks/useStatisticState'
import useInitStates from '@/hooks/useInitStates'
import { hitungDenda } from '@/utils/hitungDenda'
import useBukuState from '@/hooks/useBukuState'
import { TBuku } from '@/types/buku'
import { Button, Dropdown } from 'flowbite-react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import useCredential from '@/hooks/useCredential'
import CostumeDropdown from '../Dropdowns/CostumeDropdown'

const TableBuku = () => {
  // State
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState<'edit' | 'create'>('create')
  const bukuState = useBukuState()
  const { tipePelajar } = useCredential()
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
    tipePelajar: tipePelajar,
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
      // console.log({ packageItem })

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

      // console.log(response.data)
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
        // console.log({ input })

        const response = await axios.post('/api/buku/update', {
          idBuku: input.idBuku,
          data: { ...input, idBuku: undefined },
        })

        // update state
        const updatedData: TBuku[] = bukuState.data.map((buku) =>
          buku.idBuku === input.idBuku ? input : buku,
        )

        // console.log({ updatedData })

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

  useEffect(() => {
    const filteredBukuState = bukuState.data.filter(
      (item) => item.tipePelajar === tipePelajar,
    )
    bukuState.setData(filteredBukuState)
  }, [])

  const listJenisBuku = [
    { text: 'Kumpulan Soal', code: 'kumpulanSoal' },
    { text: 'Buku Pelajaran', code: 'bukuPelajaran' },
    { text: 'Buku Paket', code: 'bukuPaket' },
    { text: 'Novel/Cerpen', code: 'novelCerpen' },
    { text: 'Majalah', code: 'majalah' },
    { text: 'Koran SMA', code: 'koranSMA' },
  ]

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
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <Dropdown
                      label={
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.25 11.25C3.49264 11.25 4.5 10.2426 4.5 9C4.5 7.75736 3.49264 6.75 2.25 6.75C1.00736 6.75 0 7.75736 0 9C0 10.2426 1.00736 11.25 2.25 11.25Z"
                            fill="#98A6AD"
                          />
                          <path
                            d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
                            fill="#98A6AD"
                          />
                          <path
                            d="M15.75 11.25C16.9926 11.25 18 10.2426 18 9C18 7.75736 16.9926 6.75 15.75 6.75C14.5074 6.75 13.5 7.75736 13.5 9C13.5 10.2426 14.5074 11.25 15.75 11.25Z"
                            fill="#98A6AD"
                          />
                        </svg>
                      }
                      arrowIcon={false}
                      dismissOnClick={false}
                    >
                      <Dropdown.Item
                        onClick={() => {
                          setInput(bookItem)
                          setOpen(true)
                          setIsEdit('edit')
                        }}
                        className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
                      >
                        <svg
                          className="fill-current"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_62_9787)">
                            <path
                              d="M15.55 2.97499C15.55 2.77499 15.475 2.57499 15.325 2.42499C15.025 2.12499 14.725 1.82499 14.45 1.52499C14.175 1.24999 13.925 0.974987 13.65 0.724987C13.525 0.574987 13.375 0.474986 13.175 0.449986C12.95 0.424986 12.75 0.474986 12.575 0.624987L10.875 2.32499H2.02495C1.17495 2.32499 0.449951 3.02499 0.449951 3.89999V14C0.449951 14.85 1.14995 15.575 2.02495 15.575H12.15C13 15.575 13.725 14.875 13.725 14V5.12499L15.35 3.49999C15.475 3.34999 15.55 3.17499 15.55 2.97499ZM8.19995 8.99999C8.17495 9.02499 8.17495 9.02499 8.14995 9.02499L6.34995 9.62499L6.94995 7.82499C6.94995 7.79999 6.97495 7.79999 6.97495 7.77499L11.475 3.27499L12.725 4.49999L8.19995 8.99999ZM12.575 14C12.575 14.25 12.375 14.45 12.125 14.45H2.02495C1.77495 14.45 1.57495 14.25 1.57495 14V3.87499C1.57495 3.62499 1.77495 3.42499 2.02495 3.42499H9.72495L6.17495 6.99999C6.04995 7.12499 5.92495 7.29999 5.87495 7.49999L4.94995 10.3C4.87495 10.5 4.92495 10.675 5.02495 10.85C5.09995 10.95 5.24995 11.1 5.52495 11.1H5.62495L8.49995 10.15C8.67495 10.1 8.84995 9.97499 8.97495 9.84999L12.575 6.24999V14ZM13.5 3.72499L12.25 2.49999L13.025 1.72499C13.225 1.92499 14.05 2.74999 14.25 2.97499L13.5 3.72499Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_62_9787">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDelete(bookItem)}
                        className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
                      >
                        <svg
                          className="fill-current"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.225 2.20005H10.3V1.77505C10.3 1.02505 9.70005 0.425049 8.95005 0.425049H7.02505C6.27505 0.425049 5.67505 1.02505 5.67505 1.77505V2.20005H3.75005C3.02505 2.20005 2.42505 2.80005 2.42505 3.52505V4.27505C2.42505 4.82505 2.75005 5.27505 3.22505 5.47505L3.62505 13.75C3.67505 14.775 4.52505 15.575 5.55005 15.575H10.4C11.425 15.575 12.275 14.775 12.325 13.75L12.75 5.45005C13.225 5.25005 13.55 4.77505 13.55 4.25005V3.50005C13.55 2.80005 12.95 2.20005 12.225 2.20005ZM6.82505 1.77505C6.82505 1.65005 6.92505 1.55005 7.05005 1.55005H8.97505C9.10005 1.55005 9.20005 1.65005 9.20005 1.77505V2.20005H6.85005V1.77505H6.82505ZM3.57505 3.52505C3.57505 3.42505 3.65005 3.32505 3.77505 3.32505H12.225C12.325 3.32505 12.425 3.40005 12.425 3.52505V4.27505C12.425 4.37505 12.35 4.47505 12.225 4.47505H3.77505C3.67505 4.47505 3.57505 4.40005 3.57505 4.27505V3.52505V3.52505ZM10.425 14.45H5.57505C5.15005 14.45 4.80005 14.125 4.77505 13.675L4.40005 5.57505H11.625L11.25 13.675C11.2 14.1 10.85 14.45 10.425 14.45Z"
                            fill=""
                          />
                          <path
                            d="M8.00005 8.1001C7.70005 8.1001 7.42505 8.3501 7.42505 8.6751V11.8501C7.42505 12.1501 7.67505 12.4251 8.00005 12.4251C8.30005 12.4251 8.57505 12.1751 8.57505 11.8501V8.6751C8.57505 8.3501 8.30005 8.1001 8.00005 8.1001Z"
                            fill=""
                          />
                          <path
                            d="M9.99994 8.60004C9.67494 8.57504 9.42494 8.80004 9.39994 9.12504L9.24994 11.325C9.22494 11.625 9.44994 11.9 9.77494 11.925C9.79994 11.925 9.79994 11.925 9.82494 11.925C10.1249 11.925 10.3749 11.7 10.3749 11.4L10.5249 9.20004C10.5249 8.87504 10.2999 8.62504 9.99994 8.60004Z"
                            fill=""
                          />
                          <path
                            d="M5.97497 8.60004C5.67497 8.62504 5.42497 8.90004 5.44997 9.20004L5.62497 11.4C5.64997 11.7 5.89997 11.925 6.17497 11.925C6.19997 11.925 6.19997 11.925 6.22497 11.925C6.52497 11.9 6.77497 11.625 6.74997 11.325L6.57497 9.12504C6.57497 8.80004 6.29997 8.57504 5.97497 8.60004Z"
                            fill=""
                          />
                        </svg>
                        Delete
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
                  <CostumeDropdown
                    trigger={
                      <input
                        readOnly
                        value={
                          listJenisBuku.find(
                            (item) => item.code === input.jenisBuku,
                          )?.text || ''
                        }
                        type="text"
                        placeholder="Jenis Buku"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    }
                  >
                    {listJenisBuku.map((jenisBuku, index) => (
                      <Button
                        key={index}
                        className="w-full"
                        onClick={() => {
                          setInput((prev) => ({
                            ...prev,
                            jenisBuku: jenisBuku.code,
                          }))
                        }}
                      >
                        {jenisBuku.text}
                      </Button>
                    ))}
                  </CostumeDropdown>
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
