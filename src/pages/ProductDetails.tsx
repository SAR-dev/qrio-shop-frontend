import NavLayout from '../layouts/NavLayout'
import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi'
import parse from 'html-react-parser';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { pb, usePocket } from '../contexts/PocketContext';
import { Collections } from '../types/pocketbase';
import { ProductSuggestResType, TexpandProductDetailsResType } from '../types/response';
import { api, getImageUrl } from '../helpers';
import NotFoundError from '../components/NotFoundError';
import DataFetchError from '../components/DataFetchError';
import SectionLeftHeader from '../components/SectionLeftHeader';
import ProductCard from '../components/ProductCard';
import { useCartStore } from '../stores/cartStore';
import { useNotification } from '../contexts/NotificationContext';
import { NotificationType } from '../types/notification';
import classNames from 'classnames';
import { useWishListStore } from '../stores/wishListStore';
import { BsCartPlus, BsCartCheckFill } from "react-icons/bs";
import Image from '../components/Image';

const ProductDetails = () => {
    const { user } = usePocket()
    const { slug } = useParams();
    const { addToCart, products: cartProducts } = useCartStore()
    const { toogleWish, products: wishedProducts } = useWishListStore()
    const notification = useNotification()
    const [isLoading, setIsLoading] = useState(false)

    const [productDetails, setProductDetails] = useState<TexpandProductDetailsResType | null>(null)
    const [suggestedProductData, setSuggestedProductData] = useState<ProductSuggestResType | null>(null)

    const [notFound, setNotFound] = useState(false)
    const [fetchError, setFetchError] = useState(false)
    const [question, setQuestion] = useState("")
    const [contactNo, setContactNo] = useState("")

    const cartProductIds = useMemo(() => new Set(cartProducts.map(e => e.id)), [cartProducts]);
    const wishedProductIds = useMemo(() => new Set(wishedProducts.map(e => e.id)), [wishedProducts]);
    const addedToCart = useMemo(() => productDetails ? cartProductIds.has(productDetails.id) : false, [cartProductIds, productDetails]);
    const addedToWish = useMemo(() => productDetails ? wishedProductIds.has(productDetails.id) : false, [wishedProductIds, productDetails]);

    useEffect(() => {
        if (slug?.length == 0) return;
        pb
            .collection(Collections.Products)
            .getFirstListItem(`slug="${slug}"`, {
                expand: "categories, images, series"
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

    const handleAddToCart = () => {
        if(!user){
            notification.add({
                status: NotificationType.INFO,
                title: "Sign In",
                message: "Please sign in to access this feature."
            })
            return;
        }
        if (!productDetails) return;
        setIsLoading(true)
        addToCart({ productId: productDetails.id })
            .then(() => {
                notification.showAddedToCart(productDetails.title)
                setIsLoading(false)
            })
            .catch((err) => {
                notification.add({
                    status: NotificationType.ERROR,
                    title: "Error occured",
                    message: err.response.data.message ?? "Adding items to cart failed. Please try later."
                })
                setIsLoading(false)
            })
    }

    const handleAddToWish = () => {
        if(!user){
            notification.add({
                status: NotificationType.INFO,
                title: "Sign In",
                message: "Please sign in to access this feature."
            })
            return;
        }
        if (!productDetails) return;
        setIsLoading(true)
        toogleWish({ productId: productDetails.id })
            .then((res) => {
                if(res == 1){
                    notification.showAddedToWishlist(productDetails.title)
                }
                if(res == 0){
                    notification.showRemovedFromWishlist(productDetails.title)
                }
                setIsLoading(false)
            })
            .catch(() => {
                notification.add({
                    status: NotificationType.ERROR,
                    title: "Error occured",
                    message: "Adding items to wishlist failed. Please try later."
                })
                setIsLoading(false)
            })
    }

    const handleSubmitQuery = () => {
        if(!user){
            notification.add({
                status: NotificationType.INFO,
                title: "Sign In",
                message: "Please sign in to access this feature."
            })
            return;
        }
        setIsLoading(true)
        api
            .post("/api/query", {
                question, contactNo, productId: productDetails?.id
            })
            .then(() => {
                notification.add({
                    status: NotificationType.SUCCESS,
                    title: "Query Submitted",
                    message: "We have recieved your query. We will get back to you as soon as possible."
                })
                setIsLoading(false)
                setQuestion("")
                setContactNo("")
            })
            .catch(() => {
                notification.add({
                    status: NotificationType.ERROR,
                    title: "Error occured",
                    message: "Query submit failed. Please try later."
                })
                setIsLoading(false)
            })
    }

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
                <textarea
                    className="textarea textarea-bordered h-24"
                    placeholder="Type here..."
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                />
                <input
                    type="text"
                    className='mt-5 input input-bordered input-sm'
                    placeholder='Contact No (Optional)'
                    value={contactNo}
                    onChange={e => setContactNo(e.target.value)}
                />
                <button
                    className="btn btn-sm bg-base-100 no-animation mt-5"
                    disabled={isLoading}
                    onClick={handleSubmitQuery}
                >Send Query</button>
            </label>
        </div>
    )

    return (
        <NavLayout>
            {productDetails && (
                <div className="max-w-screen-xl mx-auto px-5 py-12 grid grid-cols-1 gap-16">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                        <div className="shrink-0 w-full mx-auto h-fit lg:sticky top-[5rem]">
                            <div className="carousel rounded-box h-[28rem] w-full">
                                {productDetails.expand.images.map((image, i) => (
                                    <div id={image.id} className="carousel-item h-full w-full" key={i}>
                                        <Image
                                            className='w-full object-cover'
                                            src={getImageUrl({ id: image.id, filename: image.source })}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="my-5 hidden lg:block">
                                <QueryForm />
                            </div>
                        </div>
                        <div className="mt-6 sm:mt-8 lg:mt-0">
                            <h1 className="text-2xl font-bold sm:text-3xl">
                                {productDetails.title}
                            </h1>
                            <div className="mt-6 sm:items-center sm:gap-4 sm:flex">
                                <div className="flex gap-3">
                                    <p className="title text-2xl font-extrabold sm:text-3xl">
                                        TK {Number(productDetails.sellingPrice) - Number(productDetails.discount)}
                                    </p>
                                    {productDetails.discount > 0 && (
                                        <p className="title text-2xl sm:text-3xl font-extralight line-through opacity-50">
                                            TK {productDetails.sellingPrice}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-6 gap-4 items-center flex sm:mt-8">
                                <button
                                    className={classNames({
                                        "btn": true,
                                        "btn-outline btn-primary": !addedToWish,
                                        "btn-primary": addedToWish
                                    })}
                                    disabled={isLoading}
                                    onClick={handleAddToWish}
                                >
                                    <label
                                        className={classNames({
                                            "swap swap-flip": true,
                                            "swap-active": addedToWish
                                        })}
                                    >
                                        <FiHeart className="size-5 swap-off" />
                                        <FaHeart className="size-5 swap-on" />
                                    </label>
                                    {addedToWish ? "Added to wishlist" : "Add to wishlist"}
                                </button>
                                <button
                                    className={classNames({
                                        "btn": true,
                                        "btn-success": !addedToCart,
                                        "btn-primary": addedToCart
                                    })}
                                    disabled={isLoading}
                                    onClick={handleAddToCart}
                                >
                                    <label
                                        className={classNames({
                                            "swap swap-flip": true,
                                            "swap-active": addedToCart
                                        })}
                                    >
                                        <BsCartPlus className="size-5 swap-off" />
                                        <BsCartCheckFill className="size-5 swap-on" />
                                    </label>
                                    {addedToCart ? "Added to cart" : "Add to cart"}
                                </button>
                            </div>
                            <hr className="my-6 md:my-8 border-base-content/25" />
                            <div className="grid grid-cols-1 gap-4">
                            <div className="flex gap-2">
                                {Number(productDetails.discount) > 0 && (
                                    <div className="w-fit bg-secondary text-secondary-content py-1 px-2 text-sm">Save TK {productDetails.discount}</div>
                                )}
                                {productDetails.inStock ? (
                                    <div className="px-2 py-1 bg-success text-success-content w-fit text-sm">🚀 In Stock</div>
                                ) : (
                                    <div className="px-2 py-1 bg-error text-error-content w-fit text-sm">⛟ Out Of Stock</div>
                                )}
                            </div>
                                <div className='flex flex-col gap-2'>
                                    <div><b>🏷️ Category : </b> {productDetails.expand.categories.title}</div>
                                    <div><b>🎬 Series : </b> {productDetails.expand.series.title}</div>
                                </div>
                                <p className='leading-7'>
                                    ✍️ {productDetails.summary}
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
                        <div className="mb-5">
                            <SectionLeftHeader title='RECOMMENDATIONS' subtitle='You might be interested in these items. Feel free to browse.' />
                        </div>
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