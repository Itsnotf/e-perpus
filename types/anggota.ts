export interface TAnggota {
  idAnggota: string
  nis: string
  nama: string
  hp: string
  kelas: string
  kategoriKelas: 'IPA' | 'IPS'
  tahunMasuk: Date
}
