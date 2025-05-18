import { Link } from 'react-router'
import { MdArrowRightAlt } from 'react-icons/md';
import SectionLeftHeader from '../components/SectionLeftHeader';
import { useCartStore } from '../stores/cartStore';
import { useMemo, useState } from 'react';
import { useWishListStore } from '../stores/wishListStore';
import CartProductCard from '../components/CartProductCard';
import WishedProductCard from '../components/WishedProductCard';
import { constants } from '../constants';
import { useNotification } from '../contexts/NotificationContext';
import { NotificationType } from '../types/notification';
import { formatPrice } from '../helpers';
import AuthNavLayout from '../layouts/AuthNavLayout';

const ShoppingCart = () => {
    const notification = useNotification()
    const { products: cartProducts } = useCartStore();
    const { products: wishedProducts } = useWishListStore();
    const totalPayable = useMemo(() => (cartProducts.map(e => (Number(e.sellingPrice) - Number(e.discount)) * Number(e.amount)).reduce((a, b) => a + b, 0)) + constants.FEES.TAX, [cartProducts]);
    const [voucher, setVoucher] = useState("")

    const handleVoucher = () => {
        setVoucher("")
        notification.add({
            status: NotificationType.ERROR,
            title: "Invalid voucher or gift card",
            message: "The voucher or gift card is not applicable to these items."
        })
    }

    return (
        <AuthNavLayout>
            <div className="max-w-screen-xl w-full mx-auto px-5 py-10 lg:py-12">
                <div className="mb-5">
                    <SectionLeftHeader title='🛒 SHOPPING CART' subtitle='Review you items added to cart and proceed to checkout' />
                </div>
                <div className="md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        {cartProducts.length == 0 ? (
                            <div className="card border border-base-content/25 p-5">
                                Your cart is empty
                            </div>
                        ) : (
                            <div className="card grid grid-cols-1 border border-base-content/25 overflow-hidden divide-y divide-base-content/25">
                                {cartProducts.map((product, i) => (
                                    <CartProductCard product={product} key={i} />
                                ))}
                            </div>
                        )}
                        <div className="mt-10">
                            <div className="mb-5">
                                <SectionLeftHeader title='✨ WISHLIST' subtitle='Save, organize, and track the products for easy shopping later!' />
                            </div>
                            {wishedProducts.length == 0 ? (
                                <div className="card border border-base-content/25 p-5">
                                    Your wishlist is empty
                                </div>
                            ) : (
                                <div className="card grid grid-cols-1 border border-base-content/25 overflow-hidden divide-y divide-base-content/25">
                                    {wishedProducts.map((data, i) => (
                                        <WishedProductCard product={data} key={i} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full lg:sticky top-[5rem]">
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
                                            {formatPrice(cartProducts.map(e => Number(e.sellingPrice) * Number(e.amount)).reduce((a, b) => a + b, 0))} TK
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className='text-base-content/75'>
                                            Savings
                                        </dt>
                                        <dd className="font-medium">
                                            - {formatPrice(cartProducts.map(e => Number(e.discount) * Number(e.amount)).reduce((a, b) => a + b, 0))} TK
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base-content/75">
                                            Tax
                                        </dt>
                                        <dd className="font-medium">
                                            {formatPrice(constants.FEES.TAX)} TK
                                        </dd>
                                    </dl>
                                </div>
                                <dl className="flex items-center justify-between gap-4 border-t border-base-content/25 pt-2">
                                    <dt className="font-bold">
                                        Total
                                    </dt>
                                    <dd className="font-bold">
                                        {formatPrice(totalPayable)} TK
                                    </dd>
                                </dl>
                            </div>
                            <Link to="/carts/checkout" className="btn btn-primary">Proceed to Checkout</Link>
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
                            <input 
                                type="text" 
                                className="input input-bordered w-full" 
                                value={voucher}
                                onChange={e => setVoucher(e.target.value)}
                            />
                            <button className="btn btn-accent w-full" onClick={handleVoucher}>Apply Code</button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthNavLayout>
    )
}

export default ShoppingCart