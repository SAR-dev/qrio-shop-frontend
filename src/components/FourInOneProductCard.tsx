import { ProductData, ProductSectionData } from "../types/response";
import SectionLeftHeader from "./SectionLeftHeader";
import { getImageUrl } from '../helpers'
import { Link } from 'react-router'

const BoxProduct = ({ product }: { product?: ProductData }) => {
    if (!product) {
        return (
            <div className="group">
                <div className="card h-48 lg:h-32 w-full bg-base-content/50 animate-pulse" />
                <div className="mt-2 text-xs">
                    N/A
                </div>
            </div>
        )
    }
    return (
        <Link to={`/products/${product.slug}`} className='group'>
            <div className="h-48 lg:h-32 relative">
                {product.productImageId.length > 0 ? (
                    <img
                        className="h-48 lg:h-32 w-full object-cover card"
                        src={getImageUrl({ id: product.productImageId, filename: product.productImageSource })}
                    />
                ) : (
                    <div className="h-32 w-full bg-base-content/50 animate-pulse" />
                )}
                <div className="absolute bottom-0 left-0 m-2 glass text-base-100 text-xs py-1 px-2">TK {Number(product.sellingPrice) - Number(product.discount)}</div>
            </div>
            <div className="mt-2 text-xs line-clamp-1">
                {product.title}
            </div>
        </Link>
    )
}

const FourInOneProductCard = ({ data }: { data: ProductSectionData }) => {
    return (
        <div className="card grid grid-cols-2 gap-5">
            <div className="col-span-2">
                <SectionLeftHeader title={data.title} subtitle={data.subtitle} />
            </div>
            {data.products.map((product, i) => (
                <BoxProduct product={product} key={i} />
            ))}
            {[...Array(4 - data.products.length)].map((_, i) => <BoxProduct key={i} />)}
        </div>
    )
}

export default FourInOneProductCard