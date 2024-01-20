export type TResponseGetPengembalian = {
  idPeminjaman: string
  dataPeminjaman: {
    idAnggota: string
    dataAnggota: {
      kelas: string
      hp: string
      nama: string
    }
    kodeBuku: string
    databuku: {
      namaBuku: string
      kodeBuku: string
    }
    tanggalPeminjaman: Date
    tanggalPengembalian: Date
  }
  status: string
  denda: number
  tanggalPengembalian: Date
}

export interface TPengembalian {
  idPeminjaman: string
  denda: number
  status: 'selesai' | 'belum'
  tanggalPengembalian: Date
}
