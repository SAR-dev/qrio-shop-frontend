import { FaHeart, FaPlus } from "react-icons/fa";

const ProductCard = () => {
    return (
        <div className="group">
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
            </div>
            <div className="pt-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <div className="title text-2xl font-extrabold">Transformer Lego</div>
                    <button className="btn btn-ghost btn-sm btn-circle">
                        <FaHeart className="size-4" />
                    </button>
                </div>
                <div className="text-base-content/50 font-light">
                    A popular lego that will be a good choice for your collection
                </div>
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