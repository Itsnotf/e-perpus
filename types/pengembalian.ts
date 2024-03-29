import { TResponseGetPeminjaman } from './peminjaman'

export type TResponseGetPengembalian = {
  idPeminjaman: string
  dataPeminjaman: TResponseGetPeminjaman
  status: string
  denda: number
  tanggalPengembalian: Date
  tipePelajar: 'SMA' | 'SMP' | 'Referensi'
}

export interface TRequestPengembalian {
  idPeminjaman: string
  denda: number
  status: 'selesai' | 'belum'
  tanggalPengembalian: Date
  tipePelajar: 'SMA' | 'SMP' | 'Referensi'
}
