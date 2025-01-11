const PromotionProductCard = () => {
    return (
        <div className="card flex-col lg:flex-row gap-5 justify-between bg-warning/25 py-5 px-10 group">
            <img
                className="h-48 lg:h-64 object-contain group-hover:animate-bounce-slow"
                src="https://www.minitopia.com.au/cdn/shop/files/FUN80395--My-Hero-Academia-Nana-Shimura-Pop_-01_600x.png?v=1729820482"
                alt=""
            />
            <div className="flex flex-col gap-5 text-center lg:text-right justify-center">
                <div className="text-yellow-700 leading-4 uppercase title font-bold">Naruto</div>
                <div className="text-xl text-warning-content font-extrabold leading-4 uppercase title">Action Figure</div>
                <div className="mx-auto lg:mx-0 px-5 lg:px-0 w-full lg:w-48 text-warning-content">
                    Unleash the power of the Uchiha clan with the Itachi small action figure!
                </div>
            </div>
        </div>
    )
}

export default PromotionProductCard