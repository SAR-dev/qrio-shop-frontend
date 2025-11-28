import { ProductData } from "../types/response"
import { getImageUrl } from "../helpers"
import { useMemo, useState } from "react";
import { NotificationType } from "../types/notification";
import { useCartStore } from "../stores/cartStore";
import { useNotification } from "../contexts/NotificationContext";
import { BsCartPlus, BsCartCheckFill } from "react-icons/bs";
import classNames from "classnames";
import { Link } from "react-router";
import Image from "./Image";
import { usePocket } from "../contexts/PocketContext";
import { FcGoogle } from "react-icons/fc";

const PromotionProductCard = ({ data }: { data: ProductData }) => {
    const { user, oAuthLogin } = usePocket()
    const { addToCart, products: cartProducts } = useCartStore()
    const notification = useNotification()
    const [isLoading, setIsLoading] = useState(false)

    const cartProductIds = useMemo(() => new Set(cartProducts.map(e => e.id)), [cartProducts]);
    const addedToCart = useMemo(() => cartProductIds.has(data.id), [cartProductIds, data.id]);

    const discountPercentage = useMemo(
        () => Math.trunc((data.discount / data.sellingPrice) * 100),
        [data]
    );

    const handleAddToCart = () => {
        if(!user){
            notification.add({
                status: NotificationType.INFO,
                title: "Sign In",
                message: "Please sign in to access this feature.",
                body: (
                    <div className='flex w-full justify-center'>
                        <button className='btn btn-outline border-base-content/25 gap-2' onClick={oAuthLogin}>
                            <FcGoogle className='size-5' />
                            <span className='hidden md:flex'>Continue with Google</span>
                        </button>
                    </div>
                ),
            })
            return;
        }
        setIsLoading(true)
        addToCart({ productId: data.id })
            .then(() => {
                notification.add({
                    status: NotificationType.SUCCESS,
                    title: "Added to cart",
                    message: "Selected product has been added to cart."
                })
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

    return (
        <Link to={`/products/${data.slug}`} className="card flex-col lg:flex-row justify-between group border border-base-content/25 overflow-hidden">
            <div className="w-full lg:w-1/2 relative overflow-hidden">
                {data.productImageId.length > 0 ? (
                    <img
                        className="h-72 w-full object-cover transition duration-150 ease-in-out group-hover:scale-110 lg:group-hover:rotate-3"
                        src={getImageUrl({ id: data.productImageId, filename: data.productImageSource })}
                    />
                ) : (
                    <div className="h-48 lg:h-72 w-full object-cover transition duration-150 ease-in-out group-hover:scale-110 lg:group-hover:rotate-3 bg-base-content/50 animate-pulse" />
                )}
                {discountPercentage > 0 && (
                    <div className="absolute top-0 left-0 m-3">
                        <div className="w-12 h-12 rounded-full bg-accent flex justify-center items-center font-bold title text-accent-content">
                            -{discountPercentage}%
                        </div>
                    </div>
                )}
            </div>
            <div className="w-full lg:w-1/2 h-48 h-72 bg-gradient-to-tr from-primary/25 to-base-100/50">
                <div className="flex flex-col items-between p-5 h-full">
                    <div className="f-full flex flex-1 flex-col text-left lg:text-right">
                        <div className="text-secondary leading-4 uppercase title font-bold">{data.seriesTitle}</div>
                        <div className="text-xl font-extrabold uppercase title my-3">{data.title}</div>
                        <div className="mx-auto lg:ml-auto lg:mr-0 w-full font-light line-clamp-2 mb-3">
                            {data.tagLine}
                        </div>
                        {data.discount > 0 && (
                            <div className="flex items-center lg:ml-auto w-fit bg-secondary text-secondary-content px-2 py-1 text-xs">Save TK {data.discount}</div>
                        )}
                    </div>
                    <div className={classNames({
                            "join lg:ml-auto ring-2 w-fit": true, 
                            "ring-success": !addedToCart, 
                            "ring-primary": addedToCart
                        })}>
                        <div className="join-item flex justify-center items-center w-24 font-semibold">
                            TK {data.sellingPrice - data.discount}
                        </div>
                        <button
                            className={classNames({
                                "join-item btn no-animation": true,
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
                                <BsCartPlus className="size-6 swap-off" />
                                <BsCartCheckFill className="size-6 swap-on" />
                            </label>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PromotionProductCard