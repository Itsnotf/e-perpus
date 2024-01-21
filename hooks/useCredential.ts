import { TBuku } from '@/types/buku'
import { create } from 'zustand'

export type TTipePelajar = 'SMA' | 'SMP' | 'Referensi'

interface State {
  email: string
  tipePelajar: TTipePelajar
}

interface Actions {
  setEmail: (data: string) => void
  setTipePelajar: (data: TTipePelajar) => void
}

const useCredential = create<State & Actions>((set, get) => ({
  email: '',
  setEmail: (newData) => set({ email: newData }),
  tipePelajar: 'SMA',
  setTipePelajar: (newData) => set({ tipePelajar: newData }),
}))

export type TCredential = State & Actions

export default useCredential
