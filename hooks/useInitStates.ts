import { convertGetPengembalian } from '@/utils/convertApiResponse'
import React from 'react'
import { TPeminjamanState } from './usePeminjamanState'
import { TPengembalianState } from './usePengembalianState'
import { TStatisticState } from './useStatisticState'
import { calculateDateDifference } from '@/utils/hitungJarakTanggal'
import { hitungDenda } from '@/utils/hitungDenda'
import { TBukuState } from './useBukuState'
import { TBuku } from '@/types/buku'
import { TAnggotaState } from './useAnggotaState'
import { TAnggota } from '@/types/anggota'
import { TResponseGetPeminjaman } from '@/types/peminjaman'
import { TTipePelajar } from './useCredential'

type Props = {
  tipePelajar: TTipePelajar
  anggotaState: TAnggotaState
  bukuState: TBukuState
  peminjamanState: TPeminjamanState
  pengembalianState: TPengembalianState
  statisticState: TStatisticState
}

const useInitStates = ({
  tipePelajar,
  anggotaState,
  bukuState,
  peminjamanState,
  pengembalianState,
  statisticState,
}: Props) => {
  const fetchData = async () => {
    try {
      const [
        anggotaResponse,
        bukuResponse,
        peminjamanResponse,
        pengembalianResponse,
        statisticResponse,
      ] = await Promise.all([
        fetch('/api/anggota/read/all?tipePelajar=' + tipePelajar).then((res) =>
          res.json(),
        ),
        fetch('/api/buku/read/all').then((res) => res.json()),
        fetch('/api/peminjaman?tipePelajar=' + tipePelajar).then((res) =>
          res.json(),
        ),
        fetch('/api/pengembalian?tipePelajar=' + tipePelajar).then((res) =>
          res.json(),
        ),
        fetch('/api/statistic?tipePelajar=' + tipePelajar).then((res) =>
          res.json(),
        ),
      ])

      // save in state
      anggotaState.setData(anggotaResponse?.data as TAnggota[])
      bukuState.setData(bukuResponse?.data as TBuku[])
      peminjamanState.setData(
        peminjamanResponse?.data as TResponseGetPeminjaman[],
      )

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
