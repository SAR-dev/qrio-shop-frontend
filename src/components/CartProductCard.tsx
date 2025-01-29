import { CartProduct } from '../types/response'
import { Link } from 'react-router'
import { getImageUrl } from '../helpers'
import { FiHeart, FiMinus, FiPlus, FiTrash } from 'react-icons/fi'

const CartProductCard = ({ product }: { product: CartProduct }) => {
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
                        <button className="btn btn-xs btn-outline btn-square">
                            <FiMinus className="size-2.5" />
                        </button>
                        <input
                            type="text"
                            className="w-10 shrink-0 input focus:outline-none focus:ring-0 border-0"
                            defaultValue={product.amount}
                        />
                        <button className="btn btn-xs btn-outline btn-square">
                            <FiPlus className="size-2.5" />
                        </button>
                    </div>
                    <div className="flex items-center gap-4 lg:hidden">
                        <button className="btn btn-outline btn-sm">
                            <FiHeart className='size-4' />
                            Wishlist
                        </button>
                        <button className="btn btn-outline btn-sm">
                            <FiTrash className='size-4' />
                            Remove
                        </button>
                    </div>
                    <div className="text-end md:order-4 md:w-32 hidden lg:block">
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
                        <button className="btn btn-outline border-base-content/25 btn-sm">
                            <FiHeart className='size-4' />
                            Add to Favourites
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

export default CartProductCard