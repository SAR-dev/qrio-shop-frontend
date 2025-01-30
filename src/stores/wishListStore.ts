import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { constants } from '../constants'
import { api } from '../helpers'
import { ProductData, WishlistResType } from '../types/response';

type WishListStore = {
    products: ProductData[]
    refetchProducts: () => Promise<void>
    toogleWish: ({ productId }: { productId: string }) => Promise<string>
}

const fetchWishedProducts = async (): Promise<ProductData[]> => {
    const res = await api.get("/api/wishlist")
    return (res.data as WishlistResType)?.wishedProducts ?? []
}

const toogleWishedProduct = async ({ productId }: { productId: string }) => {
    const res = await api.post("/api/wishlist", { productId })
    return res.data.message;
}

export const useWishListStore = create<WishListStore>()(
    persist(
        (set) => {
            return {
                products: [],
                refetchProducts: async () => {
                    const products = await fetchWishedProducts()
                    set({ products })
                },
                toogleWish: async ({ productId }) => {
                    const res = await toogleWishedProduct({ productId })
                    await useWishListStore.getState().refetchProducts()
                    return res;
                }
            }
        },
        {
            name: constants.WISHLIST_STORE_KEY,
            storage: createJSONStorage(() => localStorage),
        }
    )
)

useWishListStore.getState().refetchProducts()
