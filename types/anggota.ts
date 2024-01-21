export interface TAnggota {
  idAnggota: string
  nis: string
  nama: string
  tipePelajar: 'SMA' | 'SMP' | 'Referensi'
  hp: string
  kelas: string
  kategoriKelas: 'IPA' | 'IPS'
  tahunMasuk: Date
}
