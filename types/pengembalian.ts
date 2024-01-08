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
