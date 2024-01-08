import { create } from 'zustand'

interface State {
  jumlahPeminjam: number
  jumlahBukuDikembalikan: number
  jumlahBukuBelumDikembalikan: number
  denda: number
}

interface Actions {
  setData: (newData: State) => void
  addDenda: (newDenda: number) => void
  resetDenda: () => void
}

const useStatisticState = create<State & Actions>((set, get) => ({
  jumlahPeminjam: 0,
  jumlahBukuDikembalikan: 0,
  jumlahBukuBelumDikembalikan: 0,
  denda: 0,
  setData: (newData) => set(newData),
  addDenda: (newDenda) => set((state) => ({ denda: state.denda + newDenda })),
  resetDenda: () => set(() => ({ denda: 0 })),
}))

export default useStatisticState
