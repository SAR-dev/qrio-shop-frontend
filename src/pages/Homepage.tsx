import ProductCard from "../components/ProductCard";
import NavLayout from "../layouts/NavLayout";
import CategoryBox from "../components/CategoryBox";
import SeriesBox from "../components/SeriesBox";
import { useLocalStorage } from "usehooks-ts";
import { HomepageListResType, HomepageResType, ProductData, ProductSectionData } from "../types/response";
import { constants } from "../constants";
import { useEffect, useState } from "react";
import HomepageCarouselItem from "../components/HomepageCarouselItem";
import { api, getImageUrl, maxDivisibleByFour, maxDivisibleByThree, maxDivisibleByTwo } from "../helpers";
import SectionLeftHeader from "../components/SectionLeftHeader";
import { Link } from "react-router";
import SocialLinksCarousel from "../components/SocialLinksCarousel";
import PromotionProductCard from "../components/PromotionProductCard";
import Carousel from "../components/Carousel";

const Homepage = () => {
    const [step, setStep] = useState(1)

    const [homepageData, setHomepageData] = useLocalStorage<HomepageResType | null>(constants.HOMEPAGE_DATA_STORE_KEY, null)
    const [promotedProductListData, setPromotedProductListData] = useLocalStorage<ProductData[] | []>(constants.PROMOTED_PRODUCT_DATA_STORE_KEY, [])
    const [homepageProductData, setHomepageProductData] = useLocalStorage<ProductSectionData[]>(constants.HOMEPAGE_PRODUCT_DATA_STORE_KEY, [])
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
            .get('/api/promoted-products')
            .then(res => {
                setPromotedProductListData(res.data)
                setStep(3)
            })
            .catch(err => console.log(err))
    }, [step])

    useEffect(() => {
        if (step != 3) return;
        api
            .get('/api/homepage-products')
            .then(res => {
                setHomepageProductData(res.data)
                setStep(4)
            })
            .catch(err => console.log(err))
    }, [step])

    useEffect(() => {
        if (step != 3) return;
        api
            .get('/api/homepage-lists')
            .then(res => {
                setHomepageListData(res.data)
                setStep(5)
            })
            .catch(err => console.log(err))
    }, [step])


    return (
        <NavLayout>
            <div className="max-w-screen-xl mx-auto px-5 py-10 lg:py-12 grid grid-cols-1 gap-10 lg:gap-16">
                {homepageData && (
                    <Carousel>
                        {homepageData.homepageCarousel.map((data, i) => (
                            <div className="carousel-item w-full" key={i}>
                                <HomepageCarouselItem data={data} />
                            </div>
                        ))}
                    </Carousel>
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
                                <Link to={`/products?${constants.FILTERS.SERIES_ID}=${series.id}`} className="h-40 w-full relative overflow-hidden group" key={i}>
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
                {promotedProductListData.length > 0 && (
                    <div>
                        <div className="mb-5">
                            <SectionLeftHeader title="PROMOTED PRODUCTS" subtitle="Visit our most popular categories which is mind-blowing" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            {promotedProductListData.slice(0, maxDivisibleByTwo(promotedProductListData.length)).map((data, i) => (
                                <PromotionProductCard data={data} key={i} />
                            ))}
                        </div>
                    </div>
                )}
                {homepageProductData.map((section, i) => (
                    <div key={i}>
                        <div className="mb-5">
                            <SectionLeftHeader title={section.title.toUpperCase()} subtitle={section.subtitle} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                            {section.products.slice(0, maxDivisibleByFour(section.products.length)).map((data, i) => (
                                <ProductCard data={data} key={i} />
                            ))}
                        </div>
                    </div>
                ))}
                {homepageListData && homepageListData.categoryList.length > 0 && (
                    <div>
                        <div className="mb-5">
                            <SectionLeftHeader title="CATEGORIES" subtitle="Figures, Apparel, Collectibles, and More – All in One Place!" />
                        </div>
                        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-8 text-xl font-semibold">
                            {homepageListData.categoryList.map((category, i) => (
                                <div className="flex flex-col items-center gap-3" key={i}>
                                    <Link to={`/products?${constants.FILTERS.CATEGORY_ID}=${category.id}`} className="btn btn-circle btn-lg btn-outline hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-base-100" key={i}>
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