'use client'
import usePengembalianState from '@/hooks/usePengembalianState'
import axios from 'axios'
import { useState } from 'react'

function TablePengembalian() {
  // state
  const [open, setOpen] = useState(false)
  const packageState = usePengembalianState()

  // handler
  const handleOpen = () => {
    setOpen(!false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (idPeminjaman = '') => {
    if (idPeminjaman === '') return

    if (confirm('Apakah anda yakin ingin menghapus data ini?')) {
      try {
        const response = await axios.post('/api/pengembalian/updateStatus', {
          idPeminjaman,
        })
        if (response.data?.status === 'success') {
          const updatedData = packageState.data.map((item) => {
            if (item.idPeminjaman === idPeminjaman) {
              return {
                ...item,
                status: 'selesai',
                tanggalPengembalian: new Date(), // Set tanggal pengembalian sesuai dengan waktu pembaruan status
              }
            }
            return item
          })

          // Memanggil setData untuk mengupdate state
          packageState.setData(updatedData)
        }
      } catch (error) {
        alert('Error: ' + error)
      }
    }
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto scroll ">
        <div className="flex items-center justify-between pb-6 px-4 md:px-6 xl:px-7.5 border-b-[1px]">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Data Pengembalian
          </h4>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                NIS
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Nama
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Kode Buku
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Buku
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Tanggal <br /> Pengembalian
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              {/* <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th> */}
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {packageState?.data?.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.nim}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.nama}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.kodeBuku}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.namaBuku}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.tanggalPengembalian.toLocaleDateString(
                      'id-ID',
                    )}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      packageItem.status === 'selesai'
                        ? 'text-success bg-success'
                        : packageItem.status === 'belum'
                        ? 'text-danger bg-danger'
                        : 'text-warning bg-warning'
                    }`}
                  >
                    {packageItem.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      disabled={packageItem.status === 'selesai'}
                      onClick={() => handleSubmit(packageItem.idPeminjaman)}
                      className={`flex justify-center rounded ${
                        packageItem.status === 'selesai'
                          ? 'bg-gray border-primary text-primary'
                          : 'bg-primary'
                      } p-3 font-medium border text-gray 
                      transition-colors focus:border-primary focus:border focus:bg-gray focus:text-primary`}
                    >
                      Restore
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex flex-col justify-center items-center  ">
          <div className="ml-67 overflow-y-auto mt-25 h-[55%] w-[60%] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form action="">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Data Peminjam
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    NISN
                  </label>
                  <input
                    maxLength={4}
                    type="text"
                    placeholder="Default Input"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Kode Buku
                  </label>
                  <input
                    maxLength={4}
                    type="text"
                    placeholder="Default Input"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Tanggal Dikembalikan
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-end gap-5">
                  <button
                    // onClick={handleSubmit}
                    className="flex  justify-center rounded bg-primary p-3 font-medium border text-gray transition-colors focus:border-primary focus:border focus:bg-gray focus:text-primary"
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleClose}
                    className="flex  justify-center rounded bg-primary p-3 font-medium border text-gray transition-colors focus:border-primary focus:border focus:bg-gray focus:text-primary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TablePengembalian
