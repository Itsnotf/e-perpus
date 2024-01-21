export type TLaporanPengunjungByKelas = {
  [month: string]: {
    jumlahSiswaIPA: { [kelas: string]: number }
    jumlahSiswaIPS: { [kelas: string]: number }
  }
}

export interface TLaporanPengunjungByJurusan {
  kelasX: number
  kelasXI: number
  kelasXII: number
}

export type LaporanAtribut = {
  jumlahBuku: number
  rusakA: number
  rusakB: number
  hilang: number
  jumlahSekarang: number
}

export interface TLaporanBuku {
  jumlahBukuNonFiksi: {
    kumpulanSoal: LaporanAtribut
    bukuPelajaran: LaporanAtribut
    bukuPaket: LaporanAtribut
  }
  jumlahBukuFiksi: {
    novelCerpen: LaporanAtribut
    majalah: LaporanAtribut
  }
  koranSMA: LaporanAtribut
  total: LaporanAtribut
}

export interface TLaporanBukuSMP {
  jumlahBukuNonFiksi: {
    bukuPelajaran: number
  }
  jumlahBukuFiksi: {
    novelCerpen: number
  }
  total: {
    jumlahBuku: number
    rusakA: number
    rusakB: number
    hilang: number
    jumlahSekrang: number
  }
}

export interface TLaporanBukuReferensi {
  referensi: number
  total: {
    jumlahBuku: number
    rusakA: number
    rusakB: number
    hilang: number
    jumlahSekrang: number
  }
}
