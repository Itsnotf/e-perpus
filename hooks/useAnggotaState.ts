import { TAnggota } from '@/types/anggota'
import { create } from 'zustand'

interface State {
  data: TAnggota[]
}

interface Actions {
  setData: (data: TAnggota[]) => void
  addData: (newData: TAnggota) => void
  deleteData: (idAnggota: string) => void
}

const useAnggotaState = create<State & Actions>((set, get) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
  addData: (newData) => {
    const currentData = get().data
    const updatedData = [newData, ...currentData]
    set({ data: updatedData })
  },
  deleteData: (idAnggota) => {
    const currentData = get().data
    const updatedData = currentData.filter(
      (item) => item.idAnggota !== idAnggota,
    )
    set({ data: updatedData })
  },
}))

export type TAnggotaState = State & Actions

export default useAnggotaState
