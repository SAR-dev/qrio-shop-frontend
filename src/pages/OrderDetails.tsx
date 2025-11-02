import { useEffect, useState } from 'react';
import AuthNavLayout from '../layouts/AuthNavLayout'
import { pb, usePocket } from '../contexts/PocketContext'
import { Collections } from '../types/pocketbase';
import { useNavigate, useParams } from 'react-router'
import NavLayout from '../layouts/NavLayout'
import NotFoundError from '../components/NotFoundError'
import DataFetchError from '../components/DataFetchError'
import { api, formatPrice, getImageUrl } from '../helpers'
import { InvoiceProduct, InvoiceProductResType, TexpanInvoiceDetailsResType } from '../types/response'
import { FaCheckCircle } from 'react-icons/fa'
import { FcCancel } from 'react-icons/fc'
import { useNotification } from '../contexts/NotificationContext'
import { NotificationType } from '../types/notification'

const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

const OrderDetails = () => {
    const { ref } = useParams();
    const { user } = usePocket()
    const notification = useNotification()
    const navigate = useNavigate()
    const [invoice, setInvoice] = useState<TexpanInvoiceDetailsResType | null>(null)
    const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProduct[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const [notFound, setNotFound] = useState(false)
    const [fetchError, setFetchError] = useState(false)

    useEffect(() => {
        if (!user || ref?.length == 0) return;
        pb
            .collection(Collections.Invoices)
            .getFirstListItem(`users = "${user.id}" && ref = "${ref}"`, { expand: "shippingCharge" })
            .then(res => setInvoice(res as unknown as TexpanInvoiceDetailsResType))
            .catch(err => {
                if (err.status == 404) {
                    setNotFound(true)
                    return;
                }
                setFetchError(err.status != 0)
            })
    }, [user, ref])

    useEffect(() => {
        if (!invoice) return;
        api
            .get(`/api/invoice-products/${invoice.id}`)
            .then(res => {
                const data = res.data as InvoiceProductResType
                setInvoiceProducts(data.invoiceProducts)
            })
    }, [invoice])

    const handleDeleteInvoice = () => {
        if (!invoice) return;
        setIsLoading(true)
        api
            .post("/api/order-cancel", { invoiceId: invoice.id })
            .then(() => {
                notification.add({
                    status: NotificationType.SUCCESS,
                    title: "Order Cancelled",
                    message: "Order has been cancelled. Please check now."
                })
                setIsLoading(false)
                navigate(-1)
            })
            .catch(() => {
                notification.add({
                    status: NotificationType.ERROR,
                    title: "Error occured",
                    message: "Error cancelling order. Please try later."
                })
                setIsLoading(false)
            })
    }

    if (notFound) return (
        <NavLayout>
            <NotFoundError />
        </NavLayout>
    )

    if (fetchError) return (
        <NavLayout>
            <DataFetchError />
        </NavLayout>
    )

    return (
        <AuthNavLayout>
            <div className="max-w-screen-xl w-full mx-auto px-5 py-12">
                <div className='card grid grid-cols-1 divide-y divide-base-content/25 border border-base-content/25 overflow-hidden'>
                    <div className="w-full flex flex-col lg:flex-row gap-5 justify-between items-center p-5">
                        {invoice && (
                            <div className="flex flex-col md:flex-row gap-5 md:gap-10 w-full lg:w-fit">
                                <div className="flex flex-col gap-1">
                                    <div className="font-semibold opacity-75">Order number</div>
                                    <div>{invoice.ref}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="font-semibold opacity-75">Date Placed</div>
                                    <div>{(new Date(invoice.created)).toLocaleDateString(undefined, dateOptions)}</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="font-semibold opacity-75">Total amount</div>
                                    <div className='font-semibold'>TK {formatPrice(invoice.totalFee)}</div>
                                </div>
                            </div>
                        )}
                    </div>
                    {invoiceProducts.length > 0 && invoiceProducts.map((product, i) => (
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
                                                {formatPrice(Number(product.sellingPrice))} x {product.amount} TK
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {formatPrice((Number(product.sellingPrice)) * Number(product.amount))} TK
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
                    {invoice && invoiceProducts.length > 0 && (
                        <>
                            <div className="px-5 py-2 flex font-semibold text-sm justify-between">
                                <div>Shipping Fee</div>
                                <div>{formatPrice(invoice.expand.shippingCharge.shippingCost)} TK</div>
                            </div>
                            <div className="px-5 py-2 flex font-semibold text-sm justify-between">
                                <div>Tax</div>
                                <div>{formatPrice(invoice.taxFee)} TK</div>
                            </div>
                            <div className="px-5 py-2 flex font-semibold text-sm justify-between gap-5">
                                <div>Receiver</div>
                                <div>{invoice.receiverName}</div>
                            </div>
                            <div className="px-5 py-2 flex font-semibold text-sm justify-between gap-5">
                                <div>City </div>
                                <div>{invoice.receiverCity}</div>
                            </div>
                            <div className="px-5 py-2 flex font-semibold text-sm justify-between gap-5">
                                <div>Post Code </div>
                                <div>{invoice.receiverPostCode}</div>
                            </div>
                            <div className="px-5 py-2 flex font-semibold text-sm justify-between gap-5">
                                <div>Address </div>
                                <div>{invoice.receiverAddress}</div>
                            </div>
                            <div className="px-5 py-2 flex font-semibold text-sm justify-between gap-5">
                                <div>Contact No</div>
                                <div>{invoice.contactNo1}, {invoice.contactNo2}</div>
                            </div>
                            <div className="px-5 py-2 flex font-semibold text-sm justify-between gap-5">
                                <div>Note</div>
                                <div>{invoice.receiverNote}</div>
                            </div>
                            <div className="px-5 py-2 flex font-semibold text-sm justify-between gap-5">
                                <div>Shipping Company</div>
                                <div>{invoice.shippingCompany}</div>
                            </div>
                            <div className="px-5 py-2 flex font-semibold text-sm justify-between gap-5">
                                <div>Tracking No</div>
                                <div>{invoice.trackingNo}</div>
                            </div>
                            <div className="px-5 py-2 flex font-semibold text-sm justify-between gap-5">
                                <div>Tracking URL</div>
                                <div>{invoice.trackingUrl}</div>
                            </div>
                        </>
                    )}
                    {invoice && (
                        <div className="p-5 w-full flex justify-between items-center bg-base-300">
                            <div className='font-semibold'>
                                <span className="opacity-75">STATUS</span> : {invoice.status}
                            </div>
                            {invoice.status == "DELIVERED" && invoice.deliveredAt && (
                                <div className="text-success font-semibold flex items-center gap-2">
                                    <FaCheckCircle className='size-5' />
                                    <div>Delivered on {(new Date(invoice.deliveredAt)).toLocaleDateString(undefined, dateOptions)}</div>
                                </div>
                            )}
                            {invoice.status == "CREATED" && (
                                <button className="btn btn-outline border border-base-content/25" disabled={isLoading} onClick={handleDeleteInvoice}>
                                    <FcCancel className='size-5' />
                                    Cancel Order
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthNavLayout>
    )
}

export default OrderDetails