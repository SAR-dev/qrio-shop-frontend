import { FaPlus } from "react-icons/fa"

const PromotionProductCard = () => {
    return (
        <div className="card flex-col lg:flex-row justify-between group border border-base-content/25 overflow-hidden">
            <div className="w-full lg:w-1/2 relative overflow-hidden">
                <img
                    className="h-48 lg:h-72 w-full object-cover transition duration-150 ease-in-out group-hover:scale-110 group-hover:rotate-6"
                    src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a"
                    alt=""
                />
                <div className="absolute top-0 left-0 m-3">
                    <div className="w-12 h-12 rounded-full bg-accent flex justify-center items-center font-bold title text-accent-content">
                        -25%
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-5 p-5 text-left lg:text-right bg-gradient-to-tr from-primary/25 to-base-100/50">
                <div className="text-secondary leading-4 uppercase title font-bold">Naruto</div>
                <div className="text-xl font-extrabold leading-4 uppercase title">Action Figure</div>
                <div className="mx-auto lg:ml-auto lg:mr-0 w-full lg:w-48 font-light">
                    Unleash the power of the Uchiha clan with the Itachi small action figure!
                </div>
                <div className="-mt-3 lg:ml-auto w-fit bg-secondary text-secondary-content py-1 px-2 text-xs">Save TK 100</div>
                <div className="join lg:ml-auto ring-2 ring-success w-fit">
                    <div className="join-item flex justify-center items-center border border-success w-24 font-semibold">TK 500</div>
                    <button className="join-item btn btn-success no-animation">
                        <FaPlus className="h-4 w-4" />
                        <span className="uppercase lg:hidden">Add To Cart</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PromotionProductCard