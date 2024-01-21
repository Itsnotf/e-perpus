import { TAnggota } from './anggota'
import { TBuku } from './buku'

export type TResponseGetPeminjaman = {
  idPeminjaman: string
  idAnggota: string
  dataAnggota: TAnggota
  idBuku: string
  dataBuku: TBuku
  tanggalPeminjaman: Date
  tanggalPengembalian: Date
  tipePelajar: 'SMA' | 'SMP' | 'Referensi'
}

export interface TRequestPeminjaman {
  idPengembalian: string
  idAnggota: string
  nis: string
  idBuku: string
  kodeBuku: string
  tanggalPeminjaman: Date
  tanggalPengembalian: Date
  tipePelajar: 'SMA' | 'SMP' | 'Referensi'
}
