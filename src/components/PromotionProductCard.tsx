const PromotionProductCard = () => {
    return (
        <div className="card flex-col lg:flex-row justify-between bg-base-300 overflow-hidden">
            <img
                className="h-48 lg:h-64 w-full lg:w-1/2 object-cover"
                src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a"
                alt=""
            />
            <div className="flex flex-col gap-5 p-5 text-center lg:text-right justify-center">
                <div className="text-yellow-700 leading-4 uppercase title font-bold">Naruto</div>
                <div className="text-xl font-extrabold leading-4 uppercase title">Action Figure</div>
                <div className="mx-auto lg:mx-0 px-5 lg:px-0 w-full lg:w-48">
                    Unleash the power of the Uchiha clan with the Itachi small action figure!
                </div>
            </div>
        </div>
    )
}

export default PromotionProductCard