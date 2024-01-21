import { TAnggota } from '@/types/anggota'
import { TBuku } from '@/types/buku'

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
