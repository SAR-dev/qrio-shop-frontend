import NavLayout from '../layouts/NavLayout'
import { FaPlus, FaStar } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { pb } from '../contexts/PocketContext';
import { Collections } from '../types/pocketbase';
import { ProductSuggestResType, TexpandProductDetailsResType } from '../types/response';
import { api, getImageUrl } from '../helpers';
import NotFoundError from '../components/NotFoundError';
import DataFetchError from '../components/DataFetchError';
import SectionLeftHeader from '../components/SectionLeftHeader';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
    const { slug } = useParams();

    const [productDetails, setProductDetails] = useState<TexpandProductDetailsResType | null>(null)
    const [suggestedProductData, setSuggestedProductData] = useState<ProductSuggestResType | null>(null)

    const [notFound, setNotFound] = useState(false)
    const [fetchError, setFetchError] = useState(false)

    useEffect(() => {
        if (slug?.length == 0) return;
        pb
            .collection(Collections.Products)
            .getFirstListItem(`slug="${slug}"`, {
                expand: "categories, images, series, shippingMethods"
            })
            .then(res => setProductDetails(res as unknown as TexpandProductDetailsResType))
            .catch(err => {
                if (err.status == 404) {
                    setNotFound(true)
                    return;
                }
                setFetchError(err.status != 0)
            })
    }, [slug])

    useEffect(() => {
        if (!productDetails) return
        api
            .get(`/api/suggest-products/${productDetails.id}`)
            .then(res => setSuggestedProductData(res.data))
    }, [productDetails])


    if (notFound) return (
        <NavLayout>
            <NotFoundError />
        </NavLayout>
    )

    if (fetchError) return (
        <NavLayout>
            <DataFetchError />
        </NavLayout>
    )

    const QueryForm = () => (
        <div className="card bg-base-200 p-5">
            <label className="form-control">
                <div className="label pb-5">
                    <span className="label-text">🤔💭Do you have any questions ? 🤓☝️Let us know</span>
                </div>
                <textarea className="textarea textarea-bordered h-24" placeholder="Type here..." />
                <button className="btn btn-sm bg-base-100 no-animation mt-5">Send Query</button>
            </label>
        </div>
    )

    return (
        <NavLayout>
            {productDetails && (
                <div className="max-w-screen-xl mx-auto px-5 py-12 grid grid-cols-1 gap-16">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                        <div className="shrink-0 w-full mx-auto h-fit lg:sticky top-0">
                            <div className="carousel rounded-box h-[28rem] w-full">
                                {productDetails.expand.images.map((image, i) => (
                                    <div id={image.id} className="carousel-item h-full w-full" key={i}>
                                        <img className='w-full object-cover' src={getImageUrl({ id: image.id, filename: image.source })} />
                                    </div>
                                ))}
                            </div>
                            <div className="my-5 hidden lg:block">
                                <QueryForm />
                            </div>
                        </div>
                        <div className="mt-6 sm:mt-8 lg:mt-0">
                            <h1 className="text-xl font-semibold sm:text-2xl">
                                {productDetails.title}
                            </h1>
                            <div className="mt-4 flex gap-5">
                                {productDetails.discount > 0 && (
                                    <>
                                        <div className="w-fit bg-secondary text-secondary-content py-1 px-2 text-xs">Save TK {productDetails.discount}</div>
                                        <div className='line-through'>TK {productDetails.sellingPrice}</div>
                                    </>
                                )}
                            </div>
                            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                                <p className="title text-2xl font-extrabold sm:text-3xl">
                                    TK {productDetails.sellingPrice - productDetails.discount}
                                </p>
                                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                    <div className="flex items-center gap-1">
                                        <FaStar className="size-4 text-yellow-400" />
                                        <FaStar className="size-4 text-yellow-400" />
                                        <FaStar className="size-4 text-yellow-400" />
                                        <FaStar className="size-4 text-yellow-400" />
                                        <FaStar className="size-4 text-yellow-400" />
                                    </div>
                                    <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                                        (5.0)
                                    </p>
                                    <a href="#" className="text-sm font-medium leading-none underline hover:no-underline">
                                        345 Reviews
                                    </a>
                                </div>
                            </div>
                            <div className="mt-6 gap-4 items-center flex sm:mt-8">
                                <button className="btn btn-outline btn-primary">
                                    <FiHeart className='size-5' />
                                    Add to favorites
                                </button>
                                <button className="btn btn-primary">
                                    <FaPlus className='size-5' />
                                    Add to cart
                                </button>
                            </div>
                            <hr className="my-6 md:my-8 border-base-content/25" />
                            <div className="grid grid-cols-1 gap-4">
                                <div className='flex flex-col gap-2'>
                                    <div>
                                        {productDetails.inStock ? (
                                            <div className="px-2 py-1 bg-success text-success-content w-fit text-sm">🚀 In Stock</div>
                                        ) : (
                                            <div className="px-2 py-1 bg-error text-error-content w-fit text-sm">⛟ Out Of Stock</div>
                                        )}
                                    </div>
                                    <div><b>Category: </b> {productDetails.expand.categories.title}</div>
                                    <div><b>Series: </b> {productDetails.expand.series.title}</div>
                                </div>
                                <p className='leading-7'>
                                    {productDetails.summary}
                                </p>
                                {(productDetails.tags as string[]).length > 0 && (
                                    <div className="flex gap-3">
                                        {(productDetails.tags as string[]).map((tag, i) => (
                                            <div className="px-2 py-1 text-xs bg-info/20 uppercase" key={i}>{tag}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {productDetails.description.length > 0 && (
                                <>
                                    <hr className="my-6 md:my-8 border-base-content/25" />
                                    <article className="prose text-base-content">
                                        {parse(productDetails.description)}
                                    </article>
                                </>
                            )}
                            <div className="mt-5 block lg:hidden">
                                <QueryForm />
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 md:my-8 border-base-content/25" />
                    <div>
                        <SectionLeftHeader title='Shipping Details' subtitle={productDetails.expand.shippingMethods.title} />
                        <article className="prose text-base-content">
                            {parse(productDetails.expand.shippingMethods.description)}
                        </article>
                    </div>
                    <hr className="my-6 md:my-8 border-base-content/25" />
                    <div>
                        <SectionLeftHeader title='RECOMMENDATIONS' subtitle='You might be interested in these items. Feel free to browse.' />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                            {suggestedProductData?.suggestedProducts.map((data, i) => (
                                <ProductCard data={data} key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </NavLayout>
    )
}

export default ProductDetails