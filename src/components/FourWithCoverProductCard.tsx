import { ProductData, ProductSectionData } from '../types/response';
import { getImageUrl } from '../helpers';
import SectionLeftHeader from './SectionLeftHeader';
import Image from './Image';
import { Link } from 'react-router';

const BoxProduct = ({ product }: { product?: ProductData }) => {
    if (!product) {
        return <div className='card h-full w-full bg-base-content/50 animate-pulse' />;
    }
    return (
        <Link to={`/products/${product.slug}`} className='h-full w-full card overflow-hidden group relative'>
            {product.productImageId.length > 0 ? (
                <img
                    className='h-full w-full object-cover transition duration-150 ease-in-out group-hover:scale-110 lg:group-hover:rotate-3'
                    src={getImageUrl({ id: product.productImageId, filename: product.productImageSource })}
                />
            ) : (
                <div className='h-full w-full bg-base-content/50 animate-pulse transition duration-150 ease-in-out group-hover:scale-110 lg:group-hover:rotate-3' />
            )}
            <div className='absolute bottom-0 left-0 m-2 glass text-base-100 text-xs py-1 px-2'>
                TK {Number(product.sellingPrice) - Number(product.discount)}
            </div>
        </Link>
    );
};

const FourWithCoverProductCard = ({ data }: { data: ProductSectionData }) => {
    return (
        <div className='w-full card overflow-hidden gap-5 grid grid-cols-1 md:grid-cols-5'>
            <div className='md:col-span-5'>
                <SectionLeftHeader title={data.title} />
            </div>
            <div className='h-64 md:h-96 md:col-span-3 relative'>
                {data.imageId.length > 0 ? (
                    <Image className='w-full h-64 md:h-96 object-cover card' src={getImageUrl({ id: data.imageId, filename: data.imageSource })} />
                ) : (
                    <div className='w-full h-64 md:h-96 object-cover card bg-base-content/50 animate-pulse' />
                )}
                <div className='absolute bottom-0 left-0 m-3'>
                    <button className='btn glass'>{data.subtitle}</button>
                </div>
            </div>
            <div className='md:col-span-2 h-64 md:h-96'>
                <div className='grid grid-cols-2 grid-rows-2 gap-3 h-64 md:h-96'>
                    {data.products.map((product, i) => (
                        <BoxProduct product={product} key={i} />
                    ))}
                    {[...Array(4 - data.products.length)].map((_, i) => (
                        <BoxProduct key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FourWithCoverProductCard;
