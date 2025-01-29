import { Link } from "react-router"
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FeaturedCategory } from "../types/response";
import { getImageUrl } from "../helpers";

const CategoryBox = ({ data }: { data: FeaturedCategory }) => {
    return (
        <div className="card p-5 grid grid-cols-2 gap-5 bg-primary/25">
            <div className="flex justify-between col-span-2">
                <div className="text-xl font-extrabold title">
                    {data.tagLine}
                </div>
                <Link to="" className="hover:text-success">
                    <HiOutlineArrowNarrowRight className="size-5" />
                </Link>
            </div>
            {data.products.map((product, i) => (
                <div key={i}>
                    <div className="h-32">
                        {product.productImageId.length > 0 ? (
                            <img
                            className="h-32 w-full object-cover rounded"
                            src={getImageUrl({id: product.productImageId, filename: product.productImageSource})}
                        />
                        ) : (
                            <div className="h-32 w-full bg-base-content/50 animate-pulse" />
                        )}
                    </div>
                    <Link to="/products/1" className="mt-1 text-xs hover:text-success line-clamp-1">{product.productTitle}</Link>
                </div>
            ))}
        </div>
    )
}

export default CategoryBox