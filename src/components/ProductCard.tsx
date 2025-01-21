import { FaPlus } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router";

const ProductCard = () => {
    return (
        <div className="group">
            <Link to="/products/1" className="card h-64 sm:h-72 w-full relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a"
                    alt=""
                    className="absolute top-0 left-0 h-64 w-full object-cover transition duration-150 ease-in-out group-hover:scale-110 group-hover:rotate-6 sm:h-72"
                />
            </Link>
            <div className="pt-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Link to="/products/1" className="title text-2xl font-extrabold">Transformer Lego</Link>
                    <button className="btn btn-ghost btn-sm btn-circle">
                        <FiHeart className="size-4" />
                    </button>
                </div>
                <Link to="/products/1" className="text-base-content/50 font-light">
                    A popular lego that will be a good choice for your collection
                </Link>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="title text-2xl font-extrabold">TK 800</div>
                        <div className="title text-2xl font-extralight line-through opacity-50">1800</div>
                    </div>
                    <button className="btn btn-square btn-sm btn-success">
                        <FaPlus className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard