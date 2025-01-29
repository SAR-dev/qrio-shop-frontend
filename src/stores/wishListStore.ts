import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { constants } from '../constants'
import { api } from '../helpers'
import { ProductData, WishlistResType } from '../types/response';

type CartStore = {
    products: ProductData[]
    refetchProducts: () => Promise<void>
}

export const useWishListStore = create<CartStore>()(
    persist(
        (set) => {
            const fetchInitialProducts = async () => {
                const res = await api.get("/api/wishlist")
                const data: WishlistResType = res.data as unknown as WishlistResType
                if(!data) return;
                set({ products: data.wishedProducts })
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
            name: constants.WISHLIST_STORE_KEY,
            storage: createJSONStorage(() => localStorage),
        }
    )
)