import { TPeminjamanState } from '@/hooks/usePeminjamanState'
import { calculateDateDifference } from './hitungJarakTanggal'
import { TStatisticState } from '@/hooks/useStatisticState'

export const hitungDenda = (
  peminjamanState: TPeminjamanState,
  statisticState: TStatisticState,
) => {
  statisticState.resetDenda()

  let denda = 0
  peminjamanState.data.map((item) => {
    if (new Date() > item.tanggalPengembalian) {
      const jarakTanggalPengembalian = calculateDateDifference(
        item.tanggalPengembalian,
        new Date(),
      )

      if (jarakTanggalPengembalian === 0) return

      if (jarakTanggalPengembalian < 10 && jarakTanggalPengembalian > 0) {
        statisticState.addDenda(jarakTanggalPengembalian * 1000)
        denda += jarakTanggalPengembalian * 1000
      } else {
        statisticState.addDenda(10000)
        denda += 10000
      }
    }
  })
  return denda
}
