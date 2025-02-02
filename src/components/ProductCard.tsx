import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router";
import { ProductData } from "../types/response";
import { getImageUrl } from "../helpers";
import { useCartStore } from "../stores/cartStore";
import { useNotification } from "../contexts/NotificationContext";
import { useMemo, useState } from "react";
import { NotificationType } from "../types/notification";
import classNames from "classnames";
import { useWishListStore } from "../stores/wishListStore";
import { BsCartPlus, BsCartCheckFill } from "react-icons/bs";
import { usePocket } from "../contexts/PocketContext";

const ProductCard = ({ data }: { data: ProductData }) => {
    const { user } = usePocket()
    const { addToCart, products: cartProducts } = useCartStore()
    const { toogleWish, products: wishedProducts } = useWishListStore()
    const notification = useNotification()
    const [isLoading, setIsLoading] = useState(false)

    const cartProductIds = useMemo(() => new Set(cartProducts.map(e => e.id)), [cartProducts]);
    const wishedProductIds = useMemo(() => new Set(wishedProducts.map(e => e.id)), [wishedProducts]);
    const addedToCart = useMemo(() => cartProductIds.has(data.id), [cartProductIds, data.id]);
    const addedToWish = useMemo(() => wishedProductIds.has(data.id), [wishedProductIds, data.id]);

    const handleAddToCart = () => {
        if(!user){
            notification.add({
                status: NotificationType.INFO,
                title: "Sign In",
                message: "Please sign in to access this feature."
            })
            return;
        }
        setIsLoading(true)
        addToCart({ productId: data.id })
            .then(() => {
                notification.showAddedToCart(data.title)
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
        setIsLoading(true)
        toogleWish({ productId: data.id })
            .then((res) => {
                if(res == 1){
                    notification.showAddedToWishlist(data.title)
                }
                if(res == 0){
                    notification.showRemovedFromWishlist(data.title)
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

    return (
        <div className="group">
            <div className="card h-64 sm:h-72 w-full relative overflow-hidden">
                {(data.productImageId.length > 0) ? (
                    <img
                        src={getImageUrl({ id: data.productImageId, filename: data.productImageSource })}
                        className="absolute top-0 left-0 h-64 w-full object-cover transition duration-150 ease-in-out group-hover:scale-110 lg:group-hover:rotate-3 sm:h-72"
                    />
                ) : (
                    <div className="absolute top-0 left-0 h-64 w-full transition duration-150 ease-in-out group-hover:scale-110 lg:group-hover:rotate-3 sm:h-72 bg-base-content/50 animate-pulse"></div>
                )}
                <div className="absolute bottom-0 left-0 m-2 bg-base-100/50 text-base-content text-xs px-2 py-1 -translate-x-40 group-hover:translate-x-0 transition duration-150 ease-in-out">{data.seriesTitle}</div>
                <button
                    className={classNames({
                        "btn btn-circle btn-sm absolute top-0 right-0 m-2 translate-x-10 group-hover:translate-x-0 transition duration-150 ease-in-out": true,
                        "bg-transparent border-transparent": !addedToWish,
                        "bg-pink-500 border-pink-500": addedToWish
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
                        <FiHeart className="size-4 swap-off" />
                        <FaHeart className="size-4 swap-on" />
                    </label>
                </button>
            </div>
            <div className="pt-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Link to={`/products/${data.slug}`} className="title text-xl font-bold line-clamp-1">{data.title}</Link>
                    {/* <Link to="/products/1" className="title text-2xl font-extrabold line-clamp-1">{data.title}</Link> */}
                </div>
                <div className="h-12">
                    <Link to={`/products/${data.slug}`} className="text-base-content/50 font-light line-clamp-2">
                        {data.summary}
                    </Link>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="title text-2xl font-extrabold">TK {data.sellingPrice - data.discount}</div>
                        {data.discount > 0 && (
                            <div className="title text-2xl font-extralight line-through opacity-50">{data.sellingPrice}</div>
                        )}
                    </div>
                    <button
                        className={classNames({
                            "btn btn-square btn-sm": true,
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
                            <BsCartPlus className="size-4 swap-off" />
                            <BsCartCheckFill className="size-4 swap-on" />
                        </label>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard