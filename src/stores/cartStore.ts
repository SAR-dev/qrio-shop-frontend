import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { constants } from '../constants'
import { api } from '../helpers'
import { CartProduct, CartProductResType } from '../types/response'

type CartStore = {
    products: CartProduct[]
    refetchProducts: () => Promise<void>
    addToCart: ({ productId, amount }: { productId: string, amount?: number }) => Promise<void>
}

const fetchCartProducts = async (): Promise<CartProduct[]> => {
    const res = await api.get("/api/cart")
    return (res.data as CartProductResType)?.cartProducts ?? []
}

const addProductToCart = async ({ productId, amount }: { productId: string, amount?: number }) => {
    await api.post("/api/cart", { productId, amount: amount ?? 1 })
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => {
            return {
                products: [],
                refetchProducts: async () => {
                    const products = await fetchCartProducts()
                    set({ products })
                },
                addToCart: async ({ productId, amount }) => {
                    await addProductToCart({ productId, amount })
                    await useCartStore.getState().refetchProducts()
                }
            }
        },
        {
            name: constants.CART_STORE_KEY,
            storage: createJSONStorage(() => localStorage),
        }
    )
)

useCartStore.getState().refetchProducts()
