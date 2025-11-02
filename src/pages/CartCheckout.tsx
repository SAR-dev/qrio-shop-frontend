import SectionLeftHeader from '../components/SectionLeftHeader';
import { useCartStore } from '../stores/cartStore';
import { useEffect, useMemo, useState } from 'react';
import { api, formatPrice, getImageUrl } from '../helpers';
import { constants } from '../constants';
import { useNotification } from '../contexts/NotificationContext';
import { NotificationType } from '../types/notification';
import { useNavigate } from 'react-router';
import AuthNavLayout from '../layouts/AuthNavLayout';
import { useLocalStorage } from 'usehooks-ts';
import { Collections, ShippingChargesResponse } from '../types/pocketbase';
import { pb } from '../contexts/PocketContext';

const CartCheckout = () => {
    const notification = useNotification()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [shippingCharges, setShippingCharges] = useLocalStorage<ShippingChargesResponse[]>(constants.SHIPPING_CHARGES_STORE_KEY, [])
    const { refetchProducts, products: cartProducts } = useCartStore();
   
    const [data, setData] = useState({
        receiverName: "",
        receiverNote: "",
        receiverPostCode: "",
        receiverCity: "",
        receiverAddress: "",
        contactNo1: "",
        contactNo2: "",
        shippingCharge: ""
    })

    const totalPayable = useMemo(() => (
        cartProducts.map(e => (Number(e.sellingPrice) - Number(e.discount)) * Number(e.amount)).reduce((a, b) => a + b, 0)) 
        + (shippingCharges.find(charge => charge.id === data.shippingCharge)?.shippingCost || 0) 
        + constants.FEES.TAX
    , [cartProducts, data, shippingCharges]);

    const formNotFilled = useMemo(() =>
        data.receiverName.trim().length == 0
        || data.shippingCharge.length == 0
        || data.receiverCity.trim().length == 0
        || data.receiverPostCode.trim().length == 0
        || data.receiverAddress.trim().length == 0
        || data.contactNo1.trim().length < 10
        , [data])

    useEffect(() => {
        pb.collection(Collections.ShippingCharges).getFullList().then(res => {
            setShippingCharges(res)
            setData({ ...data, shippingCharge: res[0]?.id || "" })
        })
    }, [])


    const handleCheckout = () => {
        setIsLoading(true)
        api.post("/api/checkout", { ...data })
            .then(() => {
                notification.add({
                    status: NotificationType.SUCCESS,
                    title: "Checkout Completed",
                    message: `Order has been placed. Check your mail inbox for details.`
                })
                refetchProducts()
                setData({
                    receiverName: "",
                    receiverNote: "",
                    receiverPostCode: "",
                    receiverCity: "",
                    receiverAddress: "",
                    contactNo1: "",
                    contactNo2: "",
                    shippingCharge: ""
                })
                setIsLoading(false)
                navigate("/orders")
            })
            .catch(() => {
                notification.add({
                    status: NotificationType.ERROR,
                    title: "Error occured",
                    message: "Order place failed. Please try later."
                })
                setIsLoading(false)
            })
    }

    return (
        <AuthNavLayout>
            <div className="max-w-screen-xl w-full mx-auto px-5 py-10 lg:py-12">
                <div className="mb-5">
                    <SectionLeftHeader title='📦 Delivery Details' subtitle='Your delivery information and contact details' />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {cartProducts.length == 0 && (
                        <div className="card border border-base-content/25 p-5">
                            Your cart is empty
                        </div>
                    )}
                    {cartProducts.length > 0 && (
                        <div className="card grid grid-cols-1 border border-base-content/25 overflow-hidden divide-y divide-base-content/25 h-fit">
                            {cartProducts.map((product, i) => (
                                <div className="" key={i}>
                                    <div className='p-5 flex gap-5 items-center'>
                                        <div className="shrink-0">
                                            {product.productImageId.length > 0 ? (
                                                <img
                                                    className="h-10 w-10 card object-cover"
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
                                                        {formatPrice(Number(product.sellingPrice))} x {product.amount} TK
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {formatPrice(shippingCharges.find(charge => charge.id === data.shippingCharge)?.shippingCost || 0)} TK
                                        </div>
                                    </div>
                                    {Number(product.discount) > 0 && (
                                        <div className="px-5 py-2 border-t border-base-content/25 flex justify-between">
                                            <div className="text-primary text-sm">Discount {formatPrice(Number(product.discount))} x {product.amount} TK</div>
                                            <div className="text-primary text-sm">- {formatPrice((Number(product.discount)) * Number(product.amount))} TK</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="p-5 flex font-semibold text-sm justify-between">
                                <div>Shipping Fee</div>
                                <div>{formatPrice(shippingCharges.find(charge => charge.id === data.shippingCharge)?.shippingCost || 0)} TK</div>
                            </div>
                            <div className="p-5 flex font-semibold text-sm justify-between">
                                <div>Tax </div>
                                <div>{formatPrice(constants.FEES.TAX)} TK</div>
                            </div>
                            <div className="p-5 flex font-semibold justify-between text-black bg-yellow-500 text-xl">
                                <div>Total Payable (Cash On Delivery)</div>
                                <div>{formatPrice(totalPayable)} TK</div>
                            </div>
                        </div>
                    )}
                    {cartProducts.length > 0 && (
                        <div className="card p-5 bg-base-300 overflow-hidden divide-y divide-base-content/25 h-fit lg:sticky top-0">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="col-span-2 text-accent text-xl font-bold">☎️ Contact Information</div>
                                <label className="form-control col-span-2">
                                    <div className="label">
                                        <span className="label-text">Receiver Name <span className="text-error">*</span></span>
                                    </div>
                                    <input
                                        type="text"
                                        name='name'
                                        placeholder="Fahim Ahmed"
                                        className="input input-bordered w-full placeholder:opacity-30"
                                        value={data.receiverName}
                                        onChange={e => setData({ ...data, receiverName: e.target.value })}
                                    />
                                </label>
                                <label className="form-control col-span-2 lg:col-span-1">
                                    <div className="label">
                                        <span className="label-text">Mobile No<span className="text-error">*</span></span>
                                    </div>
                                    <input
                                        type="text"
                                        name='contact_no_1'
                                        placeholder="01234567890"
                                        className="input input-bordered w-full placeholder:opacity-30"
                                        value={data.contactNo1}
                                        onChange={e => setData({ ...data, contactNo1: e.target.value })}
                                    />
                                </label>
                                <label className="form-control col-span-2 lg:col-span-1">
                                    <div className="label">
                                        <span className="label-text">Alt Mobile No</span>
                                    </div>
                                    <input
                                        type="text"
                                        name='contact_no_2'
                                        placeholder=""
                                        className="input input-bordered w-full placeholder:opacity-30"
                                        value={data.contactNo2}
                                        onChange={e => setData({ ...data, contactNo2: e.target.value })}
                                    />
                                </label>

                                <div className="col-span-2 text-accent text-xl font-bold mt-5">🚚 Delivery Information</div>
                                <label className="form-control col-span-2">
                                    <div className="label">
                                        <span className="label-text">Delivery Area <span className="text-error">*</span></span>
                                    </div>
                                    <select 
                                        className="select select-bordered w-full" 
                                        value={data.shippingCharge} 
                                        onChange={e => setData({ ...data, shippingCharge: e.target.value })}
                                    >
                                        <option disabled value="">Select One</option>
                                        {shippingCharges.map((e, i) => (
                                            <option value={e.id} key={i}>{e.shippingArea} - TK {e.shippingCost}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="form-control col-span-1">
                                    <div className="label">
                                        <span className="label-text">Post Code<span className="text-error">*</span></span>
                                    </div>
                                    <input
                                        type="text"
                                        name='receiver_post_code'
                                        placeholder="1209"
                                        className="input input-bordered w-full placeholder:opacity-30"
                                        value={data.receiverPostCode}
                                        onChange={e => setData({ ...data, receiverPostCode: Number(e.target.value).toString() })}
                                    />
                                </label>
                                <label className="form-control col-span-1">
                                    <div className="label">
                                        <span className="label-text">City<span className="text-error">*</span></span>
                                    </div>
                                    <input
                                        type="text"
                                        name='receiver_city'
                                        placeholder="Dhaka"
                                        className="input input-bordered w-full placeholder:opacity-30"
                                        value={data.receiverCity}
                                        onChange={e => setData({ ...data, receiverCity: e.target.value })}
                                    />
                                </label>
                                <label className="form-control col-span-2">
                                    <div className="label">
                                        <span className="label-text">Delivery Address <span className="text-error">*</span></span>
                                    </div>
                                    <input
                                        type="text"
                                        name='receiver_address'
                                        placeholder="House 24, Road 8, Dhanmondi"
                                        className="input input-bordered w-full placeholder:opacity-30"
                                        value={data.receiverAddress}
                                        onChange={e => setData({ ...data, receiverAddress: e.target.value })}
                                    />
                                </label>

                                <div className="col-span-2 text-accent text-xl font-bold mt-5">✍ Note for Qrio (Optional)</div>
                                <label className="form-control col-span-2">
                                    <textarea
                                        name='receiver_note'
                                        placeholder=""
                                        className="textarea textarea-bordered w-full h-20"
                                        value={data.receiverNote}
                                        onChange={e => setData({ ...data, receiverNote: e.target.value })}
                                    />
                                </label>
                                <button
                                    className="btn btn-primary col-span-2"
                                    disabled={isLoading || cartProducts.length == 0 || formNotFilled}
                                    onClick={handleCheckout}
                                >
                                    Confirm Order
                                </button>
                            </div>
                        </div>
                    )}
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
        </AuthNavLayout>
    )
}


export default CartCheckout
