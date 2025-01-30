import { CartProduct } from '../types/response'
import { Link } from 'react-router'
import { getImageUrl } from '../helpers'
import { FiHeart, FiMinus, FiPlus, FiTrash } from 'react-icons/fi'
import { useCartStore } from '../stores/cartStore'
import { useNotification } from '../contexts/NotificationContext'
import { useState } from 'react'
import { NotificationType } from '../types/notification'

const CartProductCard = ({ product }: { product: CartProduct }) => {
    const { addToCart } = useCartStore()
    const notification = useNotification()
    const [isLoading, setIsLoading] = useState(false)

    const handleAddToCart = (amount: number) => {
        setIsLoading(true)
        addToCart({ productId: product.id, amount })
            .then(() => {
                setIsLoading(false)
                if(amount != 0) return;
                notification.add({
                    status: NotificationType.SUCCESS,
                    title: "Removed from cart",
                    message: "Selected product has been removed from cart."
                })
            })
            .catch(() => {
                notification.add({
                    status: NotificationType.ERROR,
                    title: "Error occured",
                    message: "Adding items to cart failed. Please try later."
                })
                setIsLoading(false)
            })
    }

    return (
        <div className="p-4 md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <div className="shrink-0 md:order-1 flex gap-5">
                    {product.productImageId.length > 0 ? (
                        <img
                            className="h-20 w-20 card"
                            src={getImageUrl({ id: product.productImageId, filename: product.productImageSource })}
                        />
                    ) : (
                        <div className="h-20 w-20 card bg-base-content/50 animate-pulse" />
                    )}
                    <div className="flex flex-col gap-2 lg:hidden">
                        <Link to={`/products/${product.slug}`} className="font-medium" >
                            {product.title}
                        </Link>
                        <div className='flex gap-2'>
                            <p className="font-bold">
                                TK {Number(product.sellingPrice) - Number(product.discount)}
                            </p>
                            {product.discount > 0 && (
                                <p className="line-through">
                                    TK {product.sellingPrice}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between md:order-3 md:flex-1 md:justify-end">
                    <div className="flex items-center">
                        <button className="btn btn-xs btn-outline btn-square" 
                            disabled={isLoading || Number(product.amount) == 1} 
                            onClick={() => Number(product.amount) > 1 ? handleAddToCart(Number(product.amount) - 1) : {}}
                        >
                            <FiMinus className="size-2.5" />
                        </button>
                        <div className="text-sm w-8 text-center">{product.amount}</div>
                        <button className="btn btn-xs btn-outline btn-square" disabled={isLoading} onClick={() => handleAddToCart(Number(product.amount) + 1)}>
                            <FiPlus className="size-2.5" />
                        </button>
                    </div>
                    <div className="flex items-center gap-4 lg:hidden">
                        <button className="btn btn-outline btn-sm">
                            <FiHeart className='size-4' />
                            Wishlist
                        </button>
                        <button className="btn btn-outline btn-sm" disabled={isLoading} onClick={() => handleAddToCart(0)}>
                            <FiTrash className='size-4' />
                            Remove
                        </button>
                    </div>
                    <div className="text-end md:order-4 md:w-32 hidden lg:block">
                        <p className="font-bold">
                            TK {Number(product.sellingPrice) - Number(product.discount)} x {product.amount}
                        </p>
                        {product.discount > 0 && (
                            <p className="line-through">
                                TK {product.sellingPrice}
                            </p>
                        )}
                    </div>
                </div>
                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md hidden lg:block">
                    <Link to={`/products/${product.slug}`} className="font-medium" >
                        {product.title}
                    </Link>
                    <div className="flex items-center gap-4">
                        <button className="btn btn-outline border-base-content/25 btn-sm">
                            <FiHeart className='size-4' />
                            Add to Wishlist
                        </button>
                        <button className="btn btn-outline border-base-content/25 btn-sm" disabled={isLoading} onClick={() => handleAddToCart(0)}>
                            <FiTrash className='size-4' />
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProductCard