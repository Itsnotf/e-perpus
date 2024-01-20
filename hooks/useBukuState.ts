import { TBuku } from '@/types/buku'
import { create } from 'zustand'

interface State {
  data: TBuku[]
}

interface Actions {
  setData: (data: TBuku[]) => void
  addData: (newData: TBuku) => void
  deleteData: (idBuku: string) => void
}

const useBukuState = create<State & Actions>((set, get) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
  addData: (newData) => {
    const currentData = get().data
    const updatedData = [newData, ...currentData]
    set({ data: updatedData })
  },
  deleteData: (idBuku) => {
    const currentData = get().data
    const updatedData = currentData.filter((item) => item.idBuku !== idBuku)
    set({ data: updatedData })
  },
}))

export type TBukuState = State & Actions

export default useBukuState
