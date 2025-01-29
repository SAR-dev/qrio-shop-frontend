import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { constants } from '../constants'
import { api } from '../helpers'
import { CartProduct, CartProductResType } from '../types/response'

type CartStore = {
    products: CartProduct[]
    refetchProducts: () => Promise<void>
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => {
            const fetchInitialProducts = async () => {
                const res = await api.get("/api/cart")
                const data: CartProductResType = res.data as unknown as CartProductResType
                if(!data) return;
                set({ products: data.cartProducts })
            }
            fetchInitialProducts()

            return {
                products: [],
                refetchProducts: async () => {
                    await fetchInitialProducts()
                },
            }
        },
        {
            name: constants.CART_STORE_KEY,
            storage: createJSONStorage(() => localStorage),
        }
    )
)