import { TAnggota } from '@/types/anggota'
import { TBuku } from '@/types/buku'
import { TLaporanBuku } from '@/types/laporan'

export function findAnggotaByNIS(
  dataAnggota: TAnggota[],
  nisCari: string,
): TAnggota | undefined {
  return dataAnggota.find((anggota) => anggota.nis === nisCari)
}

export function findBookByKodeBuku(
  dataBuku: TBuku[],
  kodeBuku: string,
): TBuku | undefined {
  return dataBuku.find((buku) => buku.kodeBuku === kodeBuku)
}

export function filterLaporanBuku(
  bukuState: TBuku[],
  tipeBuku: 'SMA' | 'SMP' | 'Referensi',
) {
  const accumulator: TLaporanBuku = {
    jumlahBukuNonFiksi: {
      kumpulanSoal: {
        jumlahBuku: 0,
        rusakA: 0,
        rusakB: 0,
        hilang: 0,
        jumlahSekarang: 0,
      },
      bukuPelajaran: {
        jumlahBuku: 0,
        rusakA: 0,
        rusakB: 0,
        hilang: 0,
        jumlahSekarang: 0,
      },
      bukuPaket: {
        jumlahBuku: 0,
        rusakA: 0,
        rusakB: 0,
        hilang: 0,
        jumlahSekarang: 0,
      },
    },
    jumlahBukuFiksi: {
      novelCerpen: {
        jumlahBuku: 0,
        rusakA: 0,
        rusakB: 0,
        hilang: 0,
        jumlahSekarang: 0,
      },
      majalah: {
        jumlahBuku: 0,
        rusakA: 0,
        rusakB: 0,
        hilang: 0,
        jumlahSekarang: 0,
      },
    },
    koranSMA: {
      jumlahBuku: 0,
      rusakA: 0,
      rusakB: 0,
      hilang: 0,
      jumlahSekarang: 0,
    },
    total: {
      jumlahBuku: 0,
      rusakA: 0,
      rusakB: 0,
      hilang: 0,
      jumlahSekarang: 0,
    },
  }

  const result = bukuState.reduce((acc, buku) => {
    if (buku.tipeBuku === tipeBuku) {
      // Accumulation logic for kumpulanSoal
      if (buku.jenisBuku === 'kumpulanSoal') {
        acc.jumlahBukuNonFiksi.kumpulanSoal.jumlahBuku += buku.jumlahBuku
        acc.jumlahBukuNonFiksi.kumpulanSoal.rusakA += buku.jumlahRusakA
        acc.jumlahBukuNonFiksi.kumpulanSoal.rusakB += buku.jumlahRusakB
        acc.jumlahBukuNonFiksi.kumpulanSoal.hilang += buku.jumlahHilang
        acc.jumlahBukuNonFiksi.kumpulanSoal.jumlahSekarang +=
          buku.jumlahBuku -
          buku.jumlahRusakA -
          buku.jumlahRusakB -
          buku.jumlahHilang
      }

      // Accumulation logic for bukuPelajaran
      else if (buku.jenisBuku === 'bukuPelajaran') {
        acc.jumlahBukuNonFiksi.bukuPelajaran.jumlahBuku += buku.jumlahBuku
        acc.jumlahBukuNonFiksi.bukuPelajaran.rusakA += buku.jumlahRusakA
        acc.jumlahBukuNonFiksi.bukuPelajaran.rusakB += buku.jumlahRusakB
        acc.jumlahBukuNonFiksi.bukuPelajaran.hilang += buku.jumlahHilang
        acc.jumlahBukuNonFiksi.bukuPelajaran.jumlahSekarang +=
          buku.jumlahBuku -
          buku.jumlahRusakA -
          buku.jumlahRusakB -
          buku.jumlahHilang
      }

      // Accumulation logic for bukuPaket
      else if (buku.jenisBuku === 'bukuPaket') {
        acc.jumlahBukuNonFiksi.bukuPaket.jumlahBuku += buku.jumlahBuku
        acc.jumlahBukuNonFiksi.bukuPaket.rusakA += buku.jumlahRusakA
        acc.jumlahBukuNonFiksi.bukuPaket.rusakB += buku.jumlahRusakB
        acc.jumlahBukuNonFiksi.bukuPaket.hilang += buku.jumlahHilang
        acc.jumlahBukuNonFiksi.bukuPaket.jumlahSekarang +=
          buku.jumlahBuku -
          buku.jumlahRusakA -
          buku.jumlahRusakB -
          buku.jumlahHilang
      }

      // Accumulation logic for novelCerpen
      else if (buku.jenisBuku === 'novelCerpen') {
        acc.jumlahBukuFiksi.novelCerpen.jumlahBuku += buku.jumlahBuku
        acc.jumlahBukuFiksi.novelCerpen.rusakA += buku.jumlahRusakA
        acc.jumlahBukuFiksi.novelCerpen.rusakB += buku.jumlahRusakB
        acc.jumlahBukuFiksi.novelCerpen.hilang += buku.jumlahHilang
        acc.jumlahBukuFiksi.novelCerpen.jumlahSekarang +=
          buku.jumlahBuku -
          buku.jumlahRusakA -
          buku.jumlahRusakB -
          buku.jumlahHilang
      }

      // Accumulation logic for majalah
      else if (buku.jenisBuku === 'majalah') {
        acc.jumlahBukuFiksi.majalah.jumlahBuku += buku.jumlahBuku
        acc.jumlahBukuFiksi.majalah.rusakA += buku.jumlahRusakA
        acc.jumlahBukuFiksi.majalah.rusakB += buku.jumlahRusakB
        acc.jumlahBukuFiksi.majalah.hilang += buku.jumlahHilang
        acc.jumlahBukuFiksi.majalah.jumlahSekarang +=
          buku.jumlahBuku -
          buku.jumlahRusakA -
          buku.jumlahRusakB -
          buku.jumlahHilang
      }

      // Accumulation logic for koranSMA
      else if (buku.jenisBuku === 'koranSMA') {
        acc.koranSMA.jumlahBuku += buku.jumlahBuku
        acc.koranSMA.rusakA += buku.jumlahRusakA
        acc.koranSMA.rusakB += buku.jumlahRusakB
        acc.koranSMA.hilang += buku.jumlahHilang
        acc.koranSMA.jumlahSekarang +=
          buku.jumlahBuku -
          buku.jumlahRusakA -
          buku.jumlahRusakB -
          buku.jumlahHilang
      }

      // Accumulation logic for total
      acc.total.jumlahBuku += buku.jumlahBuku
      acc.total.rusakA += buku.jumlahRusakA
      acc.total.rusakB += buku.jumlahRusakB
      acc.total.hilang += buku.jumlahHilang
      acc.total.jumlahSekarang +=
        buku.jumlahBuku -
        buku.jumlahRusakA -
        buku.jumlahRusakB -
        buku.jumlahHilang

      return acc
    } else {
      return acc
    }
  }, accumulator)

  return result
}
