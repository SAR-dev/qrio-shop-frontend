import { FiHeart } from "react-icons/fi";
import { BsCartPlus } from "react-icons/bs";

const ProductCard = () => {
    return (
        <div className="group text-sm">
            <div className="card h-64 sm:h-72 w-full relative overflow-hidden">
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
            <div className="py-2 flex flex-col gap-2">
                <div>Transformer Lego</div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-1 text-lg">
                        <div className="text-red-500 font-light">-20%</div>
                        <div className="font-semibold">400 TK</div>

                    </div>
                    <div className="bg-teal-600 text-white py-1 px-2 text-xs">Save 100 TK</div>
                </div>
                <button className="btn btn-sm w-full btn-warning gap-2 h-10">
                    <BsCartPlus className="size-5" />
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard