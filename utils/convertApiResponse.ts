import { Package } from '@/types/package'
import { TResponseGetPeminjaman } from '@/types/peminjaman'
import { TResponseGetPengembalian } from '@/types/pengembalian'
import { ApiResponse } from '@/types/request'

// export const convertGetPeminjaman = (response: ApiResponse): Package[] => {
//   return response.data.map((obj: TResponseGetPeminjaman) => ({
//     idPeminjaman: obj.idPeminjaman,
//     nama: obj.dataAnggota.nama,
//     nim: obj.dataAnggota.hp,
//     kelas: obj.dataAnggota.kelas,
//     status: '',
//     tanggalPeminjaman: new Date(obj.tanggalPeminjaman),
//     tanggalPengembalian: new Date(obj.tanggalPengembalian),
//     kodeBuku: obj.databuku.kodeBuku,
//     namaBuku: obj.databuku.namaBuku,
//   }))
// }

export const convertGetPengembalian = (response: ApiResponse): Package[] => {
  const convertedData: Package[] = response.data.map(
    (item: TResponseGetPengembalian) => {
      return {
        idPeminjaman: item.idPeminjaman,
        nama: item.dataPeminjaman.dataAnggota.nama,
        nim: item.dataPeminjaman.dataAnggota.nis,
        kelas: item.dataPeminjaman.dataAnggota.kelas,
        status: item.status,
        tanggalPengembalian: new Date(item.dataPeminjaman.tanggalPengembalian),
        tanggalPeminjaman: new Date(item.dataPeminjaman.tanggalPeminjaman),
        kodeBuku: item.dataPeminjaman.dataBuku.kodeBuku,
        namaBuku: item.dataPeminjaman.dataBuku.namaBuku,
      }
    },
  )
  return convertedData
}
