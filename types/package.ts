export type Package = {
  nama: string
  nim: string
  kelas: string
  status: string
  tanggalPengembalian: Date
  tanggalPeminjaman: Date
  kodeBuku: string
  namaBuku: string
  idPeminjaman?: string
}

export const packageData: Package[] = [
  {
    nama: 'Muhammad Akbar Aditya',
    status: 'Selesai',
    nim: '20393434',
    kelas: '3IA',
    tanggalPeminjaman: new Date(2004, 4, 2), // 2 Mei 2004
    tanggalPengembalian: new Date(2004, 4, 6), // 6 Mei 2004
    kodeBuku: '1234',
    namaBuku: 'Express Dasar',
  },
  {
    nama: 'Faiz aflah Hafizuddin',
    status: 'Belum',
    nim: '20393434',
    kelas: '3IA',
    tanggalPeminjaman: new Date(2004, 4, 2), // 2 Mei 2004
    tanggalPengembalian: new Date(2004, 4, 6), // 6 Mei 2004
    kodeBuku: '1234',
    namaBuku: 'Next Js Dasar',
  },
  {
    nama: 'Fariz aflah Hariz Ibrahim',
    status: 'Selesai',
    nim: '20393434',
    kelas: '3IA',
    tanggalPeminjaman: new Date(2004, 4, 2), // 2 Mei 2004
    tanggalPengembalian: new Date(2004, 4, 6), // 6 Mei 2004
    kodeBuku: '1234',
    namaBuku: 'Js Dasar',
  },
  {
    nama: 'Amal Iksani',
    status: 'Belum',
    nim: '20393434',
    kelas: '3IA',
    tanggalPeminjaman: new Date(2004, 4, 2), // 2 Mei 2004
    tanggalPengembalian: new Date(2004, 4, 6), // 6 Mei 2004
    kodeBuku: '1234',
    namaBuku: 'Php Dasar',
  },
]
