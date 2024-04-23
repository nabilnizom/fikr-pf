import { create } from "zustand"
import { persist } from "zustand/middleware"

interface IdsState {
  userId: string
  answerId: string
  productKey: string
  setUserId: (userId: string) => void
  setAnswerId: (answerId: string) => void
  setProductKey: (productKey: string) => void
}

const initialState: IdsState = {
  userId: JSON.parse(localStorage.getItem('Id-Store') || '')?.state?.userId,
  answerId: JSON.parse(localStorage.getItem('Id-Store') || '')?.state?.answerId,
  productKey: JSON.parse(localStorage.getItem('Id-Store') || '')?.state?.productKey,
  setUserId: () => {},
  setAnswerId: () => {},
  setProductKey: () => {}
}

export const useIdsStore = create<IdsState>()(
  persist(
    set => ({
    ...initialState,
    setUserId: (userId: string) => set({ userId }),
    setAnswerId: (answerId: string) => set({ answerId }),
    setProductKey: (productKey: string) => set({ productKey })
  }),
  { name: 'Id-Store'}
))

