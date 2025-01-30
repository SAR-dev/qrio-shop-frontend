import PromotionProductCard from "../components/PromotionProductCard";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import NavLayout from "../layouts/NavLayout";
import CategoryBox from "../components/CategoryBox";
import SeriesBox from "../components/SeriesBox";
import { useLocalStorage } from "usehooks-ts";
import { HomepageListResType, HomepageResType, TrendingProductResType } from "../types/response";
import { constants } from "../constants";
import { useEffect, useState } from "react";
import HomepageCarouselItem from "../components/HomepageCarouselItem";
import { api, getImageUrl, maxDivisibleByThree, maxDivisibleByTwo } from "../helpers";
import SectionLeftHeader from "../components/SectionLeftHeader";
import { Link } from "react-router";
import SocialLinksCarousel from "../components/SocialLinksCarousel";

const Homepage = () => {
    const [step, setStep] = useState(1)

    const [homepageData, setHomepageData] = useLocalStorage<HomepageResType | null>(constants.HOMEPAGE_DATA_STORE_KEY, null)
    const [homepageProductData, setHomepageProductData] = useLocalStorage<TrendingProductResType | null>(constants.HOMEPAGE_PRODUCT_DATA_STORE_KEY, null)
    const [homepageListData, setHomepageListData] = useLocalStorage<HomepageListResType | null>(constants.HOMEPAGE_LISTS_DATA_STORE_KEY, null)

    useEffect(() => {
        if (step != 1) return;
        api
            .get('/api/homepage')
            .then(res => {
                setHomepageData(res.data)
                setStep(2)
            })
            .catch(err => console.log(err))
    }, [step])

    useEffect(() => {
        if (step != 2) return;
        api
            .get('/api/homepage-products')
            .then(res => {
                setHomepageProductData(res.data)
                setStep(3)
            })
            .catch(err => console.log(err))
    }, [step])

    useEffect(() => {
        if (step != 3) return;
        api
            .get('/api/homepage-lists')
            .then(res => {
                setHomepageListData(res.data)
                setStep(4)
            })
            .catch(err => console.log(err))
    }, [step])


    return (
        <NavLayout>
            <div className="max-w-screen-xl mx-auto px-5 py-10 lg:py-12 grid grid-cols-1 gap-10 lg:gap-16">
                {homepageData && (
                    <div className="carousel w-full">
                        {homepageData.homepageCarousel.map((data, i) => (
                            <HomepageCarouselItem data={data} key={i} />
                        ))}
                    </div>
                )}
                {homepageData && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {homepageData.featuredCategories.slice(0, maxDivisibleByThree(homepageData?.featuredCategories.length)).map((data, i) => (
                            <CategoryBox data={data} key={i} />
                        ))}
                    </div>
                )}
                {homepageData?.featuredSeries.map((data, i) => <SeriesBox data={data} key={i} />)}
                {homepageListData && homepageListData.seriesList.length > 0 && (
                    <div>
                        <div className="mb-5">
                            <SectionLeftHeader title="TRENDING SERIES" subtitle="Most popular series currently" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                            {homepageListData.seriesList.map((series, i) => (
                                <Link to={`/search?seriesSlug=${series.slug}`} className="h-40 w-full relative overflow-hidden group" key={i}>
                                    {series.seriesImageId.length > 0 ? (
                                        <img
                                            className="card w-full h-40 object-cover"
                                            src={getImageUrl({ id: series.seriesImageId, filename: series.seriesImageSource })}
                                        />
                                    ) : (
                                        <div className="card w-full h-40 glass text-base-100 animate-pulse"></div>
                                    )}
                                    <div className="absolute bottom-0 left-0 m-2 bg-base-100/50 text-base-content text-xs px-2 py-1 -translate-x-40 group-hover:translate-x-0 transition duration-150 ease-in-out">{series.title}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
                {homepageProductData && homepageProductData.trendingProducts.length > 0 && (
                    <div>
                        <div className="mb-5">
                            <SectionLeftHeader title="POPULAR PRODUCTS" subtitle="Visit our most popular categories which is mind-blowing" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                            {homepageProductData.trendingProducts.map((data, i) => (
                                <ProductCard data={data} key={i} />
                            ))}
                        </div>
                    </div>
                )}
                {homepageProductData && homepageProductData.promotedProducts.length > 0 && (
                    <div>
                        <div className="mb-5">
                            <SectionLeftHeader title="PROMOTED PRODUCTS" subtitle="Visit our most popular categories which is mind-blowing" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            {homepageProductData.promotedProducts.slice(0, maxDivisibleByTwo(homepageProductData?.promotedProducts.length)).map((data, i) => (
                                <PromotionProductCard data={data} key={i} />
                            ))}
                        </div>
                    </div>
                )}
                {homepageProductData && homepageProductData.discountProducts.length > 0 && (
                    <div>
                        <div className="mb-5">
                            <SectionLeftHeader title="DISCOUNTED PRODUCTS" subtitle="Visit our most popular categories which is mind-blowing" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                            {homepageProductData.discountProducts.map((data, i) => (
                                <ProductCard data={data} key={i} />
                            ))}
                        </div>
                    </div>
                )}
                {homepageListData && homepageListData.blogList.length > 0 && (
                    <div>
                        <div className="mb-5">
                            <SectionLeftHeader title="BLOG CORNER" subtitle="Where thoughts take shape and ideas come to life" />
                        </div>
                        <div className="card grid grid-cols-1 border border-base-content/25 overflow-hidden divide-y divide-base-content/25">
                            {homepageListData.blogList.map((data, i) => (
                                <BlogCard data={data} key={i} />
                            ))}
                        </div>
                    </div>
                )}
                {homepageListData && homepageListData.categoryList.length > 0 && (
                    <div>
                        <div className="mb-5">
                            <SectionLeftHeader title="CATEGORIES" subtitle="Figures, Apparel, Collectibles, and More – All in One Place!" />
                        </div>
                        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-8 text-xl font-semibold">
                            {homepageListData.categoryList.map((category, i) => (
                                <div className="flex flex-col items-center gap-3" key={i}>
                                    <Link to={`/search?categorySlug=${category.slug}`} className="btn btn-circle btn-lg btn-outline hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-base-100" key={i}>
                                        {category.categoryImageId.length > 0 ? (
                                            <img className="h-full w-full rounded-full object-cover" src={getImageUrl({ id: category.categoryImageId, filename: category.categoryImageSource })} alt="" />
                                        ) : (
                                            <div className="h-full w-full rounded-full bg-base-content/50 animate-pulse" />
                                        )}
                                    </Link>
                                    <div className="title font-semibold text-sm text-center">{category.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <SocialLinksCarousel enableFetch={step == 4} />
        </NavLayout>
    )
}

export default Homepage