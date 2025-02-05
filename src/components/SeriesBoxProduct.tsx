import { Product } from '../types/response'
import { Link } from 'react-router'
import { getImageUrl } from '../helpers'

const SeriesBoxProduct = ({ product }: { product?: Product }) => {
    if(!product){
        return (
            <div className="card h-full w-full bg-base-content/50 animate-pulse" />
        )
    }
    return (
        <Link to={`/products/${product.productSlug}`} className="h-full w-full card overflow-hidden group relative">
            {product.productImageId.length > 0 ? (
                <img
                    className="h-full w-full object-cover transition duration-150 ease-in-out group-hover:scale-110 lg:group-hover:rotate-3"
                    src={getImageUrl({ id: product.productImageId, filename: product.productImageSource })}
                />
            ) : (
                <div className="h-full w-full bg-base-content/50 animate-pulse transition duration-150 ease-in-out group-hover:scale-110 lg:group-hover:rotate-3" />
            )}
            <div className="absolute bottom-0 left-0 m-2 glass text-base-100 text-xs py-1 px-2">TK {product.productPrice}</div>
        </Link>
    )
}

export default SeriesBoxProduct