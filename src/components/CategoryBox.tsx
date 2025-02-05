import { FeaturedCategory } from "../types/response";
import CategoryBoxProduct from "./CategoryBoxProduct";
import SectionLeftHeader from "./SectionLeftHeader";

const CategoryBox = ({ data }: { data: FeaturedCategory }) => {
    return (
        <div className="card grid grid-cols-2 gap-5">
            <div className="col-span-2">
                <SectionLeftHeader title={data.tagLine} />
            </div>
            {data.products.map((product, i) => (
                <CategoryBoxProduct product={product} key={i} />
            ))}
            {[...Array(4 - data.products.length)].map((_, i) => <CategoryBoxProduct key={i} />)}
        </div>
    )
}

export default CategoryBox