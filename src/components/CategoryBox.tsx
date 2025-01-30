import { Link } from "react-router"
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FeaturedCategory } from "../types/response";
import CategoryBoxProduct from "./CategoryBoxProduct";

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
                <CategoryBoxProduct product={product} key={i} />
            ))}
        </div>
    )
}

export default CategoryBox