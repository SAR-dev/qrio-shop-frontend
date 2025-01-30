import { Product } from '../types/response'
import { getImageUrl } from '../helpers'
import { Link } from 'react-router'

const CategoryBoxProduct = ({ product }: { product: Product }) => {
    return (
        <Link to={`/products/${product.productSlug}`} className='group'>
            <div className="h-32 relative">
                {product.productImageId.length > 0 ? (
                    <img
                        className="h-32 w-full object-cover rounded"
                        src={getImageUrl({ id: product.productImageId, filename: product.productImageSource })}
                    />
                ) : (
                    <div className="h-32 w-full bg-base-content/50 animate-pulse" />
                )}
            </div>
            <div className="mt-2 text-xs line-clamp-1">
                {product.productTitle}
            </div>
        </Link>
    )
}

export default CategoryBoxProduct