import { Product } from '../types/response'
import { getImageUrl } from '../helpers'
import { Link } from 'react-router'
import Image from './Image'

const CategoryBoxProduct = ({ product }: { product: Product }) => {
    return (
        <div className='group'>
            <div className="h-48 lg:h-32 relative">
                {product.productImageId.length > 0 ? (
                    <Image
                        className="h-48 lg:h-32 w-full object-cover card"
                        src={getImageUrl({ id: product.productImageId, filename: product.productImageSource })}
                    />
                ) : (
                    <div className="h-32 w-full bg-base-content/50 animate-pulse" />
                )}
                <div className="absolute bottom-0 left-0 m-2 glass text-base-100 text-xs py-1 px-2">TK {product.productPrice}</div>
            </div>
            <Link to={`/products/${product.productSlug}`} className="mt-2 text-xs line-clamp-1">
                {product.productTitle}
            </Link>
        </div>
    )
}

export default CategoryBoxProduct