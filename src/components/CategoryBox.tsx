const CategoryBox = () => {
    return (
        <div className="card p-5 grid grid-cols-2 gap-5 bg-primary/25">
            <div className="col-span-2 text-xl font-extrabold title">
                Shop deals in Fashion
            </div>
            <div>
                <div className="h-32">
                    <img
                        className="h-32 w-full object-cover"
                        src="https://static.wixstatic.com/media/0dc8f2_54546c2808c54b37904dda55ca9933ce~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0dc8f2_54546c2808c54b37904dda55ca9933ce~mv2.jpg" alt=""
                    />
                </div>
                <div className="mt-1 text-sm">Anime Figurine</div>
            </div>
            <div>
                <div className="h-32">
                    <img
                        className="h-32 w-full object-cover"
                        src="https://www.hindustantimes.com/ht-img/img/2023/02/14/550x309/The_ultimate_guide_to_collecting_anime_merchandise_1676393127687_1676393127974_1676393127974.jpeg" alt=""
                    />
                </div>
                <div className="mt-1 text-sm">Anime Figurine</div>
            </div>
            <div>
                <div className="h-32">
                    <img
                        className="h-32 w-full object-cover"
                        src="https://cdn.shopify.com/s/files/1/0255/3842/9014/files/Dandadan-Okarun-Transformed-Figma-Action-Figure-2_600x600.jpg?v=1735719077" alt=""
                    />
                </div>
                <div className="mt-1 text-sm">Anime Figurine</div>
            </div>
            <div>
                <div className="h-32">
                    <img
                        className="h-32 w-full object-cover"
                        src="https://www.justgeek.com/cdn/shop/files/ChainsawMan_FE-TUBBZ_PL_1.jpg?v=1736396238&width=900" alt=""
                    />
                </div>
                <div className="mt-1 text-sm">Anime Figurine</div>
            </div>
        </div>
    )
}

export default CategoryBox