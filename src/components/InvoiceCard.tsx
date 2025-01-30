import { useState } from 'react'
import { AiOutlineExpand } from "react-icons/ai";
import { FaCheckCircle } from 'react-icons/fa';
import { InvoicesResponse } from '../types/pocketbase';
import { api, formatNo, getImageUrl } from '../helpers';
import { InvoiceProduct, InvoiceProductResType } from '../types/response';

const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

const InvoiceStatus = {
    CREATED: "CREATED 🆕📦",
    PROCESSING: "PROCESSING ⚙️⏳",
    SHIPPED: "SHIPPED 🚚📤",
    DELIVERED: "DELIVERED 📬✅"
};


const InvoiceCard = ({ invoice }: { invoice: InvoicesResponse }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProduct[]>([])

    const handleShowProducts = () => {
        setIsLoading(true)
        api
            .get(`/api/invoice-products/${invoice.id}`)
            .then(res => {
                const data = res.data as InvoiceProductResType
                setInvoiceProducts(data.invoiceProducts)
                setIsLoading(false)
            })
    }

    return (
        <div className='card grid grid-cols-1 divide-y divide-base-content/25 border border-base-content/25 overflow-hidden'>
            <div className="w-full flex flex-col lg:flex-row gap-5 justify-between items-center p-5">
                <div className="flex gap-10 w-full lg:w-fit">
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
                        <div className='font-semibold'>TK {formatNo(invoice.totalFee)}</div>
                    </div>
                </div>
                {invoiceProducts.length == 0 && (
                    <div className="flex gap-5 w-full lg:w-fit">
                        <button className="btn btn-outline border border-base-content/25" disabled={isLoading} onClick={handleShowProducts}>
                            <AiOutlineExpand className='size-5' />
                            View Details
                        </button>
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
            {invoiceProducts.length > 0 && (
                <>
                    <div className="px-5 py-2 flex font-semibold text-sm justify-between">
                        <div>Shipping Fee</div>
                        <div>{invoice.shippingFee} TK</div>
                    </div>
                    <div className="px-5 py-2 flex font-semibold text-sm justify-between">
                        <div>Tax</div>
                        <div>{invoice.taxFee} TK</div>
                    </div>
                    <div className="px-5 py-2 flex font-semibold text-sm justify-between gap-5">
                        <div>Receiver</div>
                        <div>{invoice.receiverName}</div>
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
            <div className="p-5 w-full flex justify-between items-center bg-base-300">
                <div className='font-semibold'>
                    <span className="opacity-75">STATUS</span> : {InvoiceStatus[invoice.status as keyof typeof InvoiceStatus]}
                </div>
                {invoice.status == "DELIVERED" && invoice.deliveredAt && (
                    <div className="text-success font-semibold flex items-center gap-2">
                        <FaCheckCircle className='size-5' />
                        <div>Delivered on {(new Date(invoice.deliveredAt)).toLocaleDateString(undefined, dateOptions)}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InvoiceCard