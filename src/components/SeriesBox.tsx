const SeriesBox = () => {
    return (
        <div className="w-full card overflow-hidden p-3 gap-3 grid grid-cols-1 md:grid-cols-5 bg-gradient-to-tr from-primary/25 to-base-100/50">
            <div className="h-64 md:h-96 md:col-span-3 relative">
                <img className="w-full h-64 md:h-96 object-cover card" src="https://www.looper.com/img/gallery/the-ending-of-attack-on-titan-season-4-part-3-explained/intro-1699556714.jpg" alt="" />
                <div className="absolute bottom-0 left-0 m-3">
                    <button className="btn btn-primary text-xl font-extrabold title">Attack On Titan</button>
                </div>
            </div>
            <div className="md:col-span-2 h-64 md:h-96">
                <div className="grid grid-cols-2 grid-rows-2 gap-3 h-64 md:h-96">
                    {[...Array(4)].map((_, i) => (
                        <div className="h-full" key={i}>
                            <img
                                className="h-full w-full object-cover card"
                                src="https://s.yimg.com/ny/api/res/1.2/.KItaOdOGNnM1KtWNcY1FA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD02OTk-/https://media.zenfs.com/en/comingsoon_net_477/8d96a2247c4d0604eadcb82b65e9f212" alt=""
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SeriesBox