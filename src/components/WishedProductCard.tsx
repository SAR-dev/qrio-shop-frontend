import { ProductData } from '../types/response';
import { Link } from 'react-router'
import { getImageUrl } from '../helpers'
import { FiTrash } from 'react-icons/fi';
import { FaCartPlus } from 'react-icons/fa'
import { useState } from 'react';
import { useCartStore } from '../stores/cartStore';
import { useNotification } from '../contexts/NotificationContext';
import { NotificationType } from '../types/notification';

const WishedProductCard = ({ product }: { product: ProductData }) => {
    const { addToCart } = useCartStore()
    const notification = useNotification()
    const [isLoading, setIsLoading] = useState(false)

    const handleAddToCart = () => {
        setIsLoading(true)
        addToCart({ productId: product.id })
            .then(() => {
                notification.add({
                    status: NotificationType.SUCCESS,
                    title: "Added to cart",
                    message: "Selected product has been added to cart."
                })
                setIsLoading(false)
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
            <div className="space-y-4 md:flex md:items-center md:gap-6 md:space-y-0">
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
                <div className="flex items-center md:order-3 md:flex-1 md:justify-end">
                    <div className="flex items-center gap-4 lg:hidden">
                        <button className="btn btn-outline btn-sm" disabled={isLoading} onClick={handleAddToCart}>
                            <FaCartPlus className='size-4' />
                            Add to cart
                        </button>
                        <button className="btn btn-outline btn-sm">
                            <FiTrash className='size-4' />
                            Remove
                        </button>
                    </div>
                    <div className="text-end md:order-4 hidden lg:block">
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
                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md hidden lg:block">
                    <Link to={`/products/${product.slug}`} className="font-medium" >
                        {product.title}
                    </Link>
                    <div className="flex items-center gap-4">
                        <button className="btn btn-outline border-base-content/25 btn-sm" disabled={isLoading} onClick={handleAddToCart}>
                            <FaCartPlus className='size-4' />
                            Add to cart
                        </button>
                        <button className="btn btn-outline border-base-content/25 btn-sm">
                            <FiTrash className='size-4' />
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WishedProductCard