import { Link } from 'react-router'
import NavLayout from '../layouts/NavLayout'
import { FiHeart, FiMinus, FiPlus, FiTrash } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import SectionHeader from '../components/SectionHeader'
import { MdArrowRightAlt } from 'react-icons/md';

const ShoppingCart = () => {
    return (
        <NavLayout>
            <div className="max-w-screen-xl mx-auto px-5 py-12">
                <h2 className="text-xl font-semibold sm:text-2xl">
                    Shopping Cart
                </h2>
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="card grid grid-cols-1 border border-base-content/25 overflow-hidden divide-y divide-base-content/25">
                            {[...Array(8)].map((_, i) => (
                                <div className="p-4 md:p-6" key={i}>
                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                        <Link to="#" className="shrink-0 md:order-1">
                                            <img
                                                className="h-20 w-20 dark:hidden"
                                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                                alt="imac image"
                                            />
                                            <img
                                                className="hidden h-20 w-20 dark:block"
                                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                                alt="imac image"
                                            />
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
                                                    defaultValue={1}
                                                />
                                                <button className="btn btn-xs btn-outline btn-square">
                                                    <FiPlus className="size-2.5" />
                                                </button>
                                            </div>
                                            <div className="text-end md:order-4 md:w-32">
                                                <p className="font-bold">
                                                    TK 1,499
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                            <Link to="#" className="font-medium" >
                                                PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3,
                                                24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout
                                                INT
                                            </Link>
                                            <div className="flex items-center gap-4">
                                                <button className="btn btn-ghost btn-sm">
                                                    <FiHeart className='size-4' />
                                                    Add to Favourites
                                                </button>
                                                <button className="btn btn-ghost btn-sm">
                                                    <FiTrash className='size-4' />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="hidden xl:mt-8 xl:block">
                            <SectionHeader left />
                            <div className="mt-6 grid grid-cols-3 gap-10 sm:mt-8">
                                {[...Array(6)].map((_, i) => (
                                    <ProductCard key={i} />
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
                                            $7,592.00
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className='text-base-content/75'>
                                            Savings
                                        </dt>
                                        <dd className="font-medium">
                                            -$299.00
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className='text-base-content/75'>
                                            Store Pickup
                                        </dt>
                                        <dd className="font-medium">
                                            $99
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base-content/75">
                                            Tax
                                        </dt>
                                        <dd className="font-medium">
                                            $799
                                        </dd>
                                    </dl>
                                </div>
                                <dl className="flex items-center justify-between gap-4 border-t border-base-content/25 pt-2">
                                    <dt className="font-bold">
                                        Total
                                    </dt>
                                    <dd className="font-bold">
                                        $8,191.00
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