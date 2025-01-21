import { Link } from 'react-router'
import { useState } from 'react'
import { RiDownloadLine } from "react-icons/ri";
import { AiOutlineExpand } from "react-icons/ai";
import { FaCheckCircle } from 'react-icons/fa';

const OrderProducts = () => {
    const [showProducts, setShowProducts] = useState<boolean>(false)
    return (
        <div className='card grid grid-cols-1 divide-y divide-base-content/25 border border-base-content/25'>
            <div className="w-full flex flex-col lg:flex-row gap-5 justify-between items-center p-5">
                <div className="flex gap-10 w-full lg:w-fit">
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold opacity-75">Order number</div>
                        <div>WU88191111</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold opacity-75">Date Placed</div>
                        <div>Jul 6, 2024</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-semibold opacity-75">Total amount</div>
                        <div className='font-semibold'>TK 26,000</div>
                    </div>
                </div>
                <div className="flex gap-5 w-full lg:w-fit">
                    <button className="btn btn-outline border border-base-content/25">
                        <RiDownloadLine className='size-5' />
                        Download Invoice
                    </button>
                    <button className="btn btn-outline border border-base-content/25" onClick={() => setShowProducts(!showProducts)}>
                        <AiOutlineExpand className='size-5' />
                        View Products
                    </button>
                </div>
            </div>
            {showProducts && [...Array(8)].map((_, i) => (
                <div className="p-5" key={i}>
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <Link to="#" className="shrink-0 md:order-1 mr-5">
                            <img
                                className="h-20 w-20"
                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                alt="imac image"
                            />
                        </Link>
                        <div className="flex items-center justify-between md:order-3 md:justify-end  flex-1">
                            <div className="flex items-center">
                                3 * TK 1000
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
                        </div>
                    </div>
                </div>
            ))}
            <div className="p-5 text-success font-semibold flex items-center gap-2">
                <FaCheckCircle className='size-5' />
                <div>Delivered on July 6, 2025</div>
            </div>
        </div>
    )
}

export default OrderProducts