import PromotionProductCard from "../components/PromotionProductCard";
import { GiTravelDress } from "react-icons/gi";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import NavLayout from "../layouts/NavLayout";
import SectionHeader from "../components/SectionHeader";
import CategoryBox from "../components/CategoryBox";
import SeriesBox from "../components/SeriesBox";
import { useLocalStorage } from "usehooks-ts";
import { HomepageResType } from "../types/response-types";
import { constants } from "../constants";
import { useEffect, useState } from "react";
import HomepageCarouselItem from "../components/HomepageCarouselItem";
import { api, getImageUrl, maxDivisibleByThree } from "../helpers";
import SectionLeftHeader from "../components/SectionLeftHeader";
import { pb } from "../contexts/PocketContext";
import { Collections, ImagesResponse, SeriesResponse } from "../types/pocketbase-types";


export type TexpandSeriesResponse = SeriesResponse & {
    expand: {
      thumbnail?: ImagesResponse
    };
  };

const Homepage = () => {
    const [homepageData, setHomepageData] = useLocalStorage<HomepageResType | null>(constants.HOMEPAGE_DATA_STORE_KEY, null)
    const [seriesList, setSeriesList] = useState<TexpandSeriesResponse[]>([])

    useEffect(() => {
        api
            .get("/api/homepage")
            .then(res => setHomepageData(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        pb.collection(Collections.Series).getList(1, 12, {
            expand: "thumbnail", 
            sort: "-priority"
        }).then(res => setSeriesList(res.items as unknown as TexpandSeriesResponse[]))
    }, [])

    return (
        <NavLayout>
            <div className="max-w-screen-xl mx-auto px-5 py-12 grid grid-cols-1 gap-16">
                <div className="carousel w-full">
                    {homepageData?.homepageCarousel.map((data, i) => <HomepageCarouselItem data={data} key={i} />)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {homepageData?.featuredCategories.slice(0, maxDivisibleByThree(homepageData?.featuredCategories.length)).map((data, i) => <CategoryBox data={data} key={i} />)}
                </div>
                {homepageData?.featuredSeries.map((data, i) => <SeriesBox data={data} key={i} />)}
                <div>
                    <SectionLeftHeader title="TRENDING SERIES" subtitle="Most popular series currently" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                        {seriesList.map((series, i) => (
                            <div className="h-40 w-full relative overflow-hidden group" key={i}>
                                {series.expand.thumbnail ? (
                                    <img className="card w-full h-40 object-cover" src={getImageUrl({ id: series.expand.thumbnail.id, filename: series.expand.thumbnail.source })} />
                                ) : (
                                    <div className="card w-full h-40 bg-base-content/50 animate-pulse"></div>
                                )}
                                <div className="absolute bottom-0 left-0 m-2 bg-accent text-accent-content text-xs px-2 py-1 -translate-x-40 group-hover:translate-x-0 transition duration-150 ease-in-out">{series.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <SectionLeftHeader title="POPULAR PRODUCTS" subtitle="Visit our most popular categories which is mind-blowing" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {[...Array(8)].map((_, i) => (
                            <ProductCard key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <SectionLeftHeader title="PROMOTED PRODUCTS" subtitle="Visit our most popular categories which is mind-blowing" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {[...Array(4)].map((_, i) => (
                            <PromotionProductCard key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <SectionLeftHeader title="DISCOUNTED PRODUCTS" subtitle="Visit our most popular categories which is mind-blowing" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {[...Array(8)].map((_, i) => (
                            <ProductCard key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <SectionHeader left />
                    <div className="card grid grid-cols-1 border border-base-content/25 overflow-hidden divide-y divide-base-content/25">
                        {[...Array(5)].map((_, i) => (
                            <BlogCard key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <SectionLeftHeader title="FOLLOW US" subtitle="Visit our most popular categories which is mind-blowing" />
                    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-8 text-xl font-semibold">
                        {[...Array(20)].map((_, i) => (
                            <div className="flex flex-col items-center gap-3">
                                <button className="btn btn-circle btn-lg btn-outline" key={i}>
                                    <GiTravelDress className="size-10" />
                                </button>
                                <div className="title font-semibold text-sm text-center">Figurine</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-base-300 px-5 py-10">
                <div className="max-w-screen-xl mx-auto">
                    <SectionHeader left />
                </div>
                <div className="w-full flex justify-center">
                    <div className="carousel carousel-end rounded-box max-w-screen-xl">
                        <div className="carousel-item">
                            <img className="h-48 w-48 object-cover" src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Drink" />
                        </div>
                        <div className="carousel-item">
                            <img className="h-48 w-48 object-cover"
                                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                                alt="Drink" />
                        </div>
                        <div className="carousel-item">
                            <img className="h-48 w-48 object-cover"
                                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                                alt="Drink" />
                        </div>
                        <div className="carousel-item">
                            <img className="h-48 w-48 object-cover"
                                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                                alt="Drink" />
                        </div>
                        <div className="carousel-item">
                            <img className="h-48 w-48 object-cover" src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Drink" />
                        </div>
                        <div className="carousel-item">
                            <img className="h-48 w-48 object-cover" src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" alt="Drink" />
                        </div>
                        <div className="carousel-item">
                            <img className="h-48 w-48 object-cover"
                                src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                                alt="Drink" />
                        </div>
                    </div>
                </div>
            </div>
        </NavLayout>
    )
}

export default Homepage