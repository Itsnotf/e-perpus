import {
  convertGetPeminjaman,
  convertGetPengembalian,
} from '@/utils/convertApiResponse'
import React from 'react'
import { TPeminjamanState } from './usePeminjamanState'
import { TPengembalianState } from './usePengembalianState'
import { TStatisticState } from './useStatisticState'
import { calculateDateDifference } from '@/utils/hitungJarakTanggal'
import { hitungDenda } from '@/utils/hitungDenda'
import { TBukuState } from './useBukuState'
import { TBuku } from '@/types/buku'

type Props = {
  bukuState: TBukuState
  peminjamanState: TPeminjamanState
  pengembalianState: TPengembalianState
  statisticState: TStatisticState
}

const useInitStates = ({
  bukuState,
  peminjamanState,
  pengembalianState,
  statisticState,
}: Props) => {
  const fetchData = async () => {
    try {
      const [
        bukuResponse,
        peminjamanResponse,
        pengembalianResponse,
        statisticResponse,
      ] = await Promise.all([
        fetch('/api/buku/read/all').then((res) => res.json()),
        fetch('/api/peminjaman').then((res) => res.json()),
        fetch('/api/pengembalian').then((res) => res.json()),
        fetch('/api/statistic').then((res) => res.json()),
      ])

      console.log({ bukuResponse })

      bukuState.setData(bukuResponse?.data as TBuku[])

      const convertedPeminjaman = convertGetPeminjaman(peminjamanResponse)
      peminjamanState.setData(convertedPeminjaman)

      const convertedPengembalian = convertGetPengembalian(pengembalianResponse)
      pengembalianState.setData(convertedPengembalian)

      const {
        anggota,
        bukuDikembalikan,
        bukuBelumDikembalikan,
      } = statisticResponse.data
      const data = {
        jumlahPeminjam: anggota,
        jumlahBukuDikembalikan: bukuDikembalikan,
        jumlahBukuBelumDikembalikan: bukuBelumDikembalikan,
        denda: hitungDenda(peminjamanState, statisticState),
      }

      statisticState.setData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  fetchData()

  return null
}

export default useInitStates
