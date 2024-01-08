import { Package } from '@/types/package'
import { create } from 'zustand'

interface State {
  data: Package[]
}

interface Actions {
  setData: (data: Package[]) => void
  addData: (newData: Package) => void
}

const usePeminjamanState = create<State & Actions>((set, get) => ({
  data: [],
  setData: (newData) => set({ data: newData }),
  addData: (newData) => {
    const currentData = get().data
    const updatedData = [newData, ...currentData]
    set({ data: updatedData })
  },
}))

export default usePeminjamanState
