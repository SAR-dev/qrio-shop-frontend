import { Link } from 'react-router'
import NavLayout from '../layouts/NavLayout'
import { FiHeart, FiMinus, FiPlus, FiTrash } from 'react-icons/fi'
import { MdArrowRightAlt } from 'react-icons/md';
import SectionLeftHeader from '../components/SectionLeftHeader';
import { useCartStore } from '../stores/cartStore';
import { getImageUrl } from '../helpers';
import { useState } from 'react';
import { useWishListStore } from '../stores/wishListStore';
import ProductCard from '../components/ProductCard';

const ShoppingCart = () => {
    const { products: cartProducts } = useCartStore();
    const { products: wishedProducts } = useWishListStore();
    const [shippingFee] = useState(100)
    const [taxFee] = useState(100)

    return (
        <NavLayout>
            <div className="max-w-screen-xl w-full mx-auto px-5 py-10 lg:py-12">
                <SectionLeftHeader title='🛒 SHOPPING CART' subtitle='Review you items added to cart and proceed to checkout' />
                <div className="md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        {cartProducts.length == 0 ? (
                            <div className="card border border-base-content/25 p-5">
                                Your cart is empty
                            </div>
                        ) : (
                            <div className="card grid grid-cols-1 border border-base-content/25 overflow-hidden divide-y divide-base-content/25">
                                {cartProducts.map((product, i) => (
                                    <div className="p-4 md:p-6" key={i}>
                                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                            <Link to={`/products/${product.productSlug}`} className="shrink-0 md:order-1">
                                                {product.productImageId.length > 0 ? (
                                                    <img
                                                        className="h-20 w-20 card"
                                                        src={getImageUrl({ id: product.productImageId, filename: product.productImageSource })}
                                                    />
                                                ) : (
                                                    <div className="h-20 w-20 card bg-base-content/50 animate-pulse" />
                                                )}
                                            </Link>
                                            <label htmlFor="counter-input" className="sr-only">
                                                Choose quantity:
                                            </label>
                                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                <div className="flex items-center">
                                                    <button className="btn btn-xs btn-outline btn-square">
                                                        <FiMinus className="size-2.5" />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="w-10 shrink-0 input focus:outline-none focus:ring-0 border-0"
                                                        defaultValue={product.productAmount}
                                                    />
                                                    <button className="btn btn-xs btn-outline btn-square">
                                                        <FiPlus className="size-2.5" />
                                                    </button>
                                                </div>
                                                <div className="text-end md:order-4 md:w-32">
                                                    <p className="font-bold">
                                                        TK {product.productSellingPrice - product.productDiscount}
                                                    </p>
                                                    {product.productDiscount > 0 && (
                                                        <p className="line-through">
                                                            TK {product.productSellingPrice}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                <Link to={`/products/${product.productSlug}`} className="font-medium" >
                                                    {product.productTitle}
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
                                ))}
                            </div>
                        )}
                        <div className="mt-10">
                            <SectionLeftHeader title='✨ WISHLIST' subtitle='Save, organize, and track the products for easy shopping later!' />
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                                {wishedProducts.map((data, i) => (
                                    <ProductCard data={data} key={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full sticky top-0">
                        <div className="card space-y-4 border border-base-content/25 p-4 sm:p-6">
                            <p className="text-xl font-semibold">
                                Order summary
                            </p>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className='text-base-content/75'>
                                            Original price
                                        </dt>
                                        <dd className="font-medium">
                                            TK {cartProducts.map(e => Number(e.productSellingPrice)).reduce((a, b) => a + b, 0)}
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className='text-base-content/75'>
                                            Savings
                                        </dt>
                                        <dd className="font-medium">
                                            - TK {cartProducts.map(e => Number(e.productDiscount)).reduce((a, b) => a + b, 0)}
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className='text-base-content/75'>
                                            Shipping Fee
                                        </dt>
                                        <dd className="font-medium">
                                            TK {shippingFee}
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base-content/75">
                                            Tax
                                        </dt>
                                        <dd className="font-medium">
                                            TK {taxFee}
                                        </dd>
                                    </dl>
                                </div>
                                <dl className="flex items-center justify-between gap-4 border-t border-base-content/25 pt-2">
                                    <dt className="font-bold">
                                        Total
                                    </dt>
                                    <dd className="font-bold">
                                        TK {(cartProducts.map(e => Number(e.productSellingPrice) - Number(e.productDiscount)).reduce((a, b) => a + b, 0)) + shippingFee + taxFee}
                                    </dd>
                                </dl>
                            </div>
                            <button className="btn btn-primary">Proceed to Checkout</button>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal">
                                    or
                                </span>
                                <Link to="/" className='link'>Continue Shopping</Link>
                                <MdArrowRightAlt className='size-5' />
                            </div>
                        </div>
                        <div className="card space-y-4 flex-col items-center border border-base-content/25 p-4 sm:p-6">
                            <div className="text-sm font-medium">
                                Do you have a voucher or gift card?
                            </div>
                            <input type="text" className="input input-bordered w-full" />
                            <button className="btn btn-accent w-full">Apply Code</button>
                        </div>
                    </div>
                </div>
            </div>
        </NavLayout>
    )
}

export default ShoppingCart