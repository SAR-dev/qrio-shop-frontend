import { BsCartPlus } from "react-icons/bs"

const PromotionProductCard = () => {
    return (
        <div className="card flex-col lg:flex-row justify-between border border-base-content/25 overflow-hidden">
            <div className="w-full lg:w-1/2 relative">
                <img
                    className="h-48 lg:h-64 w-full object-cover"
                    src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a"
                    alt=""
                />
                <div className="absolute top-0 left-0 m-3">
                    <div className="w-12 h-12 rounded-full bg-yellow-400 text-red-600 flex justify-center items-center font-bold title">
                        -25%
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5 p-5 text-left lg:text-right">
                <div className="text-warning leading-4 uppercase title font-bold">Naruto</div>
                <div className="text-xl font-extrabold leading-4 uppercase title">Action Figure</div>
                <div className="mx-auto lg:mx-0 w-full lg:w-48">
                    Unleash the power of the Uchiha clan with the Itachi small action figure!
                </div>
                <div className="join lg:ml-auto">
                    <div className="join-item flex justify-center items-center border border-warning bg-warning/20 text-warning-content w-24 font-semibold">BDT 500</div>
                    <button className="join-item btn btn-warning no-animation">
                        <BsCartPlus className="h-4 w-4" />
                        <span className="uppercase lg:hidden">Add To Cart</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PromotionProductCard