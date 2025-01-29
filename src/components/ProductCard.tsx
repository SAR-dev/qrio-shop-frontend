import { FaPlus } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router";
import { ProductData } from "../types/response";
import { getImageUrl } from "../helpers";

const ProductCard = ({ data }: { data: ProductData }) => {
    return (
        <div className="group">
            <Link to={`/products/${data.slug}`} className="card h-64 sm:h-72 w-full relative overflow-hidden">
                {(data.productImageId.length > 0) ? (
                    <img
                        src={getImageUrl({ id: data.productImageId, filename: data.productImageSource })}
                        className="absolute top-0 left-0 h-64 w-full object-cover transition duration-150 ease-in-out group-hover:scale-110 lg:group-hover:rotate-3 sm:h-72"
                    />
                ) : (
                    <div className="absolute top-0 left-0 h-64 w-full transition duration-150 ease-in-out group-hover:scale-110 lg:group-hover:rotate-3 sm:h-72 bg-base-content/50 animate-pulse"></div>
                )}
                <div className="bg-primary text-primary-content text-xs px-2 py-1 w-fit absolute bottom-0 left-0 m-2">{data.seriesTitle}</div>
            </Link>
            <div className="pt-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Link to="/products/1" className="title text-xl font-bold line-clamp-1">{data.title}</Link>
                    {/* <Link to="/products/1" className="title text-2xl font-extrabold line-clamp-1">{data.title}</Link> */}
                    <button className="btn btn-ghost btn-sm btn-circle">
                        <FiHeart className="size-4" />
                    </button>
                </div>
                <div className="h-12">
                    <Link to={`/products/${data.slug}`} className="text-base-content/50 font-light line-clamp-2">
                        {data.summary}
                    </Link>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="title text-2xl font-extrabold">TK {data.sellingPrice - data.discount}</div>
                        {data.discount > 0 && (
                            <div className="title text-2xl font-extralight line-through opacity-50">{data.sellingPrice}</div>
                        )}
                    </div>
                    <button className="btn btn-square btn-sm btn-success">
                        <FaPlus className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard