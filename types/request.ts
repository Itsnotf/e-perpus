export interface PeminjamanBody {
  anggota: {
    hp: string
    kelas: string
    nama: string
  }
  buku: {
    kodeBuku: string
    namaBuku: string
  }
  peminjaman: {
    idAnggota: string
    kodeBuku: string
    tanggalPeminjaman: Date
    tanggalPengembalian: Date
  }
  pengembalian: {
    idPeminjaman: string
    denda: number
    status: string
    tanggalPengembalian: string
  }
}

export interface ApiResponse {
  status: string
  data: []
}
