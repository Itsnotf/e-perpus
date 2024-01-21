export interface TBuku {
  idBuku: string
  kodeBuku: string
  namaBuku: string
  tipePelajar: 'SMA' | 'SMP' | 'Referensi'
  jenisBuku: string
  jumlahBuku: number
  jumlahRusakA: number
  jumlahRusakB: number
  jumlahHilang: number
  keterangan: string
  tahunMasuk: Date
}
