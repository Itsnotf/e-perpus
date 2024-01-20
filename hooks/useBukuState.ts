import { TBuku } from '@/types/buku'
import { create } from 'zustand'

interface State {
  data: TBuku[]
}

interface Actions {
  setData: (data: TBuku[]) => void
  addData: (newData: TBuku) => void
  deleteData: (kodeBuku: string) => void
}

const useBukuState = create<State & Actions>((set, get) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
  addData: (newData) => {
    const currentData = get().data
    const updatedData = [newData, ...currentData]
    set({ data: updatedData })
  },
  deleteData: (kodeBuku) => {
    const currentData = get().data
    const updatedData = currentData.filter((item) => item.kodeBuku !== kodeBuku)
    set({ data: updatedData })
  },
}))

export type TBukuState = State & Actions

export default useBukuState
