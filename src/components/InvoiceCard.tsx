import { AiOutlineExpand } from "react-icons/ai";
import { InvoicesResponse } from '../types/pocketbase';
import { formatPrice } from '../helpers';
import { Link } from 'react-router';
import { FaCheckCircle } from "react-icons/fa";

const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

const InvoiceStatus = {
    CREATED: "CREATED 📦",
    PROCESSING: "PROCESSING ⏳",
    SHIPPED: "SHIPPED 🚚",
    DELIVERED: "DELIVERED ✅",
    CANCELLED: "CANCELLED ⛔"
};

const InvoiceCard = ({ invoice }: { invoice: InvoicesResponse }) => {
    return (
        <div className='card grid grid-cols-1 divide-y divide-base-content/25 border border-base-content/25 overflow-hidden'>
            <div className="w-full flex flex-col lg:flex-row gap-5 justify-between items-center p-5">
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
                <div className="flex gap-5 w-full lg:w-fit">
                    <Link to={`/orders/${invoice.ref}`} className="btn btn-outline border border-base-content/25">
                        <AiOutlineExpand className='size-5' />
                        View Details
                    </Link>
                </div>
            </div>
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