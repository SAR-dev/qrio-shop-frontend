import { FiHeart } from "react-icons/fi";
import { BsCartPlus } from "react-icons/bs";

const ProductCard = () => {
    return (
        <div className="group">
            <div className="card h-64 sm:h-72 w-full group relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a"
                    alt=""
                    className="absolute top-0 left-0 h-64 w-full object-cover opacity-100 group-hover:opacity-0 sm:h-72"
                />
                <img
                    src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a"
                    alt=""
                    className="absolute top-0 left-0 h-64 w-full object-cover opacity-0 group-hover:opacity-100 sm:h-72 transform scale-x-[-1]"
                />
                <button className="absolute end-4 top-4 z-[1] rounded-full btn btn-square btn-sm btn-error text-white translate-x-16 group-hover:translate-x-0 transition duration-300">
                    <span className="sr-only">Wishlist</span>
                    <FiHeart className="size-4" />
                </button>
                <div className="absolute bottom-0 left-0 m-2 card bg-white shadow-lg text-black px-2 -translate-x-96 group-hover:translate-x-0 transition duration-300">You can't stop me 🤭</div>
            </div>
            <div className="py-3 flex flex-col gap-3">
                <div className="text-xl font-semibold leading-4">Transformer Lego</div>
                <div className="flex gap-2">
                    <div className="text-yellow-500 font-semibold tracking-wider leading-6">BDT 400</div>
                    <div className="line-through">BDT 500</div>
                </div>
                <button className="btn btn-warning text-base-content w-full text-sm shadow-none space-x-2 hover:ring-2 hover:ring-warning hover:ring-offset-2 hover:ring-offset-base-100 transition duration-300">
                    <BsCartPlus className="h-4 w-4" />
                    ADD TO CART
                </button>
            </div>
        </div>
    )
}

export default ProductCard