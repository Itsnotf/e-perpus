export type TResponseGetPeminjaman = {
  idPeminjaman: string
  idAnggota: string
  dataAnggota: {
    kelas: string
    hp: string
    nama: string
  }
  kodeBuku: string
  databuku: {
    kodeBuku: string
    namaBuku: string
  }
  tanggalPeminjaman: Date
  tanggalPengembalian: Date
}
