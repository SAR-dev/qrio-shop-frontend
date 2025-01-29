import { FaPlus } from "react-icons/fa"
import { ProductData } from "../types/response"
import { getImageUrl } from "../helpers"
import { useMemo } from "react";

const PromotionProductCard = ({ data }: { data: ProductData }) => {
    const discountPercentage = useMemo(
        () => Math.trunc((data.discount / data.sellingPrice) * 100),
        [data]
    );

    return (
        <div className="card flex-col lg:flex-row justify-between group border border-base-content/25 overflow-hidden">
            <div className="w-full lg:w-1/2 relative overflow-hidden">
                {data.productImageId.length > 0 ? (
                    <img
                        className="h-72 w-full object-cover transition duration-150 ease-in-out group-hover:scale-110 lg:group-hover:rotate-3"
                        src={getImageUrl({ id: data.productImageId, filename: data.productImageSource })}
                    />
                ) : (
                    <div className="h-48 lg:h-72 w-full object-cover transition duration-150 ease-in-out group-hover:scale-110 lg:group-hover:rotate-3 bg-base-content/50 animate-pulse" />
                )}
                {discountPercentage > 0 && (
                    <div className="absolute top-0 left-0 m-3">
                        <div className="w-12 h-12 rounded-full bg-accent flex justify-center items-center font-bold title text-accent-content">
                            -{discountPercentage}%
                        </div>
                    </div>
                )}
            </div>
            <div className="w-full lg:w-1/2 h-48 h-72 bg-gradient-to-tr from-primary/25 to-base-100/50">
                <div className="flex flex-col items-between p-5 h-full">
                    <div className="f-full flex flex-1 flex-col gap-5 text-left lg:text-right">
                        <div className="text-secondary leading-4 uppercase title font-bold">{data.seriesTitle}</div>
                        <div className="text-xl font-extrabold leading-4 uppercase title">{data.categoryTitle}</div>
                        <div className="mx-auto lg:ml-auto lg:mr-0 w-full lg:w-48 font-light line-clamp-3">
                            {data.tagLine}
                        </div>
                        {data.discount > 0 && (
                            <div className="flex items-center -mt-3 lg:ml-auto w-fit bg-secondary text-secondary-content px-2 text-xs">Save TK {data.discount}</div>
                        )}
                    </div>
                    <div className="join ml-5 lg:ml-auto ring-2 ring-success w-fit">
                        <div className="join-item flex justify-center items-center border border-success w-24 font-semibold">TK {data.sellingPrice - data.discount}</div>
                        <button className="join-item btn btn-success no-animation">
                            <FaPlus className="h-4 w-4" />
                            <span className="uppercase lg:hidden">Add To Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromotionProductCard