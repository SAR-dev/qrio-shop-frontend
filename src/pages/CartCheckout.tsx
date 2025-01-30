import NavLayout from '../layouts/NavLayout'
import SectionLeftHeader from '../components/SectionLeftHeader';
import { useCartStore } from '../stores/cartStore';
import { useMemo, useState } from 'react';
import { api, formatNo, getImageUrl } from '../helpers';
import { constants } from '../constants';
import { useNotification } from '../contexts/NotificationContext';
import { NotificationType } from '../types/notification';
import { useNavigate } from 'react-router';

const CartCheckout = () => {
    const notification = useNotification()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const { refetchProducts, products: cartProducts } = useCartStore();
    const totalPayable = useMemo(() => (cartProducts.map(e => (Number(e.sellingPrice) - Number(e.discount)) * Number(e.amount)).reduce((a, b) => a + b, 0)) + constants.FEES.SHIPPING + constants.FEES.TAX, [cartProducts]);

    const [data, setData] = useState({
        receiverName: "",
        receiverNote: "",
        receiverAddress: "",
        contactNo1: "",
        contactNo2: "",
    })

    const handleCheckout = () => {
        setIsLoading(true)
        api.post("/api/checkout", { ...data })
            .then(res => {
                notification.add({
                    status: NotificationType.SUCCESS,
                    title: "Checkout Completed",
                    message: `Your order no is ${res.data.ref}. You can track details from order history screen.`
                })
                refetchProducts()
                setData({
                    receiverName: "",
                    receiverNote: "",
                    receiverAddress: "",
                    contactNo1: "",
                    contactNo2: "",
                })
                setIsLoading(false)
                navigate("/order-history")
            })
            .catch(() => {
                notification.add({
                    status: NotificationType.ERROR,
                    title: "Error occured",
                    message: "Adding items to wishlist failed. Please try later."
                })
                setIsLoading(false)
            })
    }

    return (
        <NavLayout>
            <div className="max-w-screen-xl w-full mx-auto px-5 py-10 lg:py-12">
                <div className="mb-5">
                    <SectionLeftHeader title='📦 Delivery Details' subtitle='Your delivery information and contact details' />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="card grid grid-cols-1 border border-base-content/25 overflow-hidden divide-y divide-base-content/25">
                        {cartProducts.map((product, i) => (
                            <div className="" key={i}>
                                <div className='p-5 flex gap-5 items-center'>
                                    <div className="shrink-0">
                                        {product.productImageId.length > 0 ? (
                                            <img
                                                className="h-10 w-10 card"
                                                src={getImageUrl({ id: product.productImageId, filename: product.productImageSource })}
                                            />
                                        ) : (
                                            <div className="h-20 w-20 card bg-base-content/50 animate-pulse" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col text-sm">
                                            <div className='font-semibold'>{product.title}</div>
                                            <div className='flex gap-2 items-center'>
                                                <div className='opacity-75 font-bold'>
                                                    {Number(product.sellingPrice)} x {product.amount} TK
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {(Number(product.sellingPrice)) * Number(product.amount)} TK
                                    </div>
                                </div>
                                {Number(product.discount) > 0 && (
                                    <div className="px-5 py-2 border-t border-base-content/25 flex justify-between">
                                        <div className="text-primary text-sm">Discount {Number(product.discount)} x {product.amount} TK</div>
                                        <div className="text-primary text-sm">- {(Number(product.discount)) * Number(product.amount)} TK</div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="p-5 flex font-semibold text-sm justify-between">
                            <div>Shipping Fee</div>
                            <div>{constants.FEES.SHIPPING} TK</div>
                        </div>
                        <div className="p-5 flex font-semibold text-sm justify-between">
                            <div>Tax </div>
                            <div>{constants.FEES.TAX} TK</div>
                        </div>
                        <div className="p-5 flex font-semibold text-sm justify-between bg-info/25">
                            <div>Total Payable </div>
                            <div>{totalPayable} TK</div>
                        </div>
                    </div>
                    <div className="card p-5 bg-base-300 overflow-hidden divide-y divide-base-content/25 h-fit lg:sticky top-0">
                        <div className="grid grid-cols-2 gap-5">
                            <label className="form-control col-span-2">
                                <div className="label">
                                    <span className="label-text">Receiver Name</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder=""
                                    className="input input-bordered w-full"
                                    value={data.receiverName}
                                    onChange={e => setData({ ...data, receiverName: e.target.value })}
                                />
                            </label>
                            <label className="form-control col-span-2">
                                <div className="label">
                                    <span className="label-text">Receiver Address</span>
                                </div>
                                <textarea
                                    placeholder=""
                                    className="textarea textarea-bordered w-full h-20"
                                    value={data.receiverAddress}
                                    onChange={e => setData({ ...data, receiverAddress: e.target.value })}
                                />
                            </label>
                            <label className="form-control col-span-2 lg:col-span-1">
                                <div className="label">
                                    <span className="label-text">Contact No</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder=""
                                    className="input input-bordered w-full"
                                    value={data.contactNo1}
                                    onChange={e => setData({ ...data, contactNo1: e.target.value })}
                                />
                            </label>
                            <label className="form-control col-span-2 lg:col-span-1">
                                <div className="label">
                                    <span className="label-text">Alt. Contact No</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder=""
                                    className="input input-bordered w-full"
                                    value={data.contactNo2}
                                    onChange={e => setData({ ...data, contactNo2: e.target.value })}
                                />
                            </label>
                            <label className="form-control col-span-2">
                                <div className="label">
                                    <span className="label-text">Receiver Note</span>
                                </div>
                                <textarea
                                    placeholder=""
                                    className="textarea textarea-bordered w-full h-20"
                                    value={data.receiverNote}
                                    onChange={e => setData({ ...data, receiverNote: e.target.value })}
                                />
                            </label>
                            <div className="text-primary col-span-2 text-sm">
                                Please pay {formatNo(totalPayable)} TK to delivery man or bkash to us and message us your mobile no.
                            </div>
                            <button className="btn btn-primary col-span-2" disabled={isLoading || cartProducts.length == 0} onClick={handleCheckout}>
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && (
                <div className="fixed top-0 left-0 h-screen w-full bg-base-100/85 z-[10] flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center gap-3">
                        <div className="loading size-16"></div>
                        <div className="text-2xl font-bold title">Please wait</div>
                    </div>
                </div>
            )}
        </NavLayout>
    )
}

export default CartCheckout