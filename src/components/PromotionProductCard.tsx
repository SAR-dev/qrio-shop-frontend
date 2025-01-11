const PromotionProductCard = () => {
    return (
        <div className="card flex-col lg:flex-row gap-5 justify-between bg-yellow-300 py-5 px-10">
                <img
                    className="h-48 lg:h-64 object-contain"
                    src="https://www.minitopia.com.au/cdn/shop/files/FUN80395--My-Hero-Academia-Nana-Shimura-Pop_-01_600x.png?v=1729820482"
                    alt=""
                />
                <div className="flex flex-col gap-5 text-center lg:text-right justify-center">
                    <div className="text-yellow-700 leading-4 uppercase">Naruto</div>
                    <div className="text-xl text-black font-extrabold leading-4 uppercase title">Action Figure</div>
                    <div className="mx-auto lg:mx-0 w-48 text-black">
                        Unlish the power of Uchia clan with this Kakashi figure
                    </div>
                </div>
            </div>
    )
}

export default PromotionProductCard