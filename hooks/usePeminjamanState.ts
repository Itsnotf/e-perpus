import { Package } from '@/types/package'
import { TResponseGetPeminjaman } from '@/types/peminjaman'
import { create } from 'zustand'

interface State {
  data: TResponseGetPeminjaman[]
}

interface Actions {
  setData: (data: TResponseGetPeminjaman[]) => void
  addData: (newData: TResponseGetPeminjaman) => void
  deleteData: (idPeminjaman: string) => void
}

const usePeminjamanState = create<State & Actions>((set, get) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
  addData: (newData) => {
    const currentData = get().data
    const updatedData = [newData, ...currentData]
    set({ data: updatedData })
  },
  deleteData: (idPeminjaman) => {
    const currentData = get().data
    const updatedData = currentData.filter(
      (item) => item.idPeminjaman !== idPeminjaman,
    )
    set({ data: updatedData })
  },
}))

export type TPeminjamanState = State & Actions

export default usePeminjamanState
