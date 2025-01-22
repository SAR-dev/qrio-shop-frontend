import PromotionProductCard from "../components/PromotionProductCard";
import { FcInTransit } from "react-icons/fc";
import { HiArrowLongRight } from "react-icons/hi2";
import { GiTravelDress } from "react-icons/gi";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import NavLayout from "../layouts/NavLayout";
import SectionHeader from "../components/SectionHeader";
import CategoryBox from "../components/CategoryBox";
import SeriesBox from "../components/SeriesBox";

const Homepage = () => {
    return (
        <NavLayout>
            <div className="max-w-screen-xl mx-auto px-5 py-12 grid grid-cols-1 gap-32">
                <div className="card bg-base-100 from-base-200 not-prose outline-base-content/5 relative overflow-hidden bg-gradient-to-b font-sans shadow-lg outline -outline-offset-1 md:flex-row-reverse">
                    <figure className="max-md:bg-primary/10 isolate shrink-0 md:w-2/3">
                        <img
                            className="pointer-events-none h-64 md:h-96 lg:h-[30rem]"
                            src="https://images.fineartamerica.com/images/artworkimages/medium/3/awesome-steins-gate-rintaro-okabe-cool-gifts-inny-shop-transparent.png"
                        />
                    </figure>
                    <div className="bg-primary-content -left-1/5 pointer-events-none absolute bottom-[-50%] aspect-square w-3/4 -translate-x-1/2 rounded-full opacity-20 blur-3xl" />
                    <div className="bg-primary pointer-events-none absolute bottom-[-120%] left-1/2 aspect-square w-full -translate-x-1/2 rounded-full opacity-20 blur-3xl" />
                    <div className="bg-base-100 pointer-events-none absolute -top-3/4 right-1/4 z-[1] aspect-square w-1/2 rounded-full opacity-60 blur-3xl" />
                    <div className="card-body relative isolate z-[1]">
                        <h2 className="card-title title text-base-content text-xl contrast-200 [text-wrap:balance] sm:w-[250%] sm:text-2xl md:text-4xl lg:text-3xl xl:text-4xl">
                            <span>
                                <span className="font-black">New Year Offer</span> <br />
                                <span className="font-black">20% OFF</span>
                            </span>
                        </h2>
                        <div className="grow">
                            <h2 className="card-title text-sm font-light sm:w-[250%] sm:text-lg md:text-lg lg:text-lg xl:text-xl">
                                <FcInTransit className="inline size-6" />
                                Available on QRIO store
                            </h2>
                        </div>
                        <a className="btn btn-block btn-primary group" href="/store">
                            More details
                            <HiArrowLongRight className="hidden h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 md:inline-block" />
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <CategoryBox />
                    <CategoryBox />
                    <CategoryBox />
                </div>
                <div>
                    <SeriesBox />
                </div>
                <div>
                    <SectionHeader left  />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {[...Array(8)].map((_, i) => (
                            <ProductCard key={i} />
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <CategoryBox />
                    <CategoryBox />
                    <CategoryBox />
                </div>
                <div>
                    <SectionHeader left  />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {[...Array(4)].map((_, i) => (
                            <PromotionProductCard key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <SeriesBox />
                </div>
                <div>
                    <SectionHeader left  />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {[...Array(8)].map((_, i) => (
                            <ProductCard key={i} />
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <CategoryBox />
                    <CategoryBox />
                    <CategoryBox />
                </div>
                <div>
                    <SectionHeader left  />
                    <div className="card grid grid-cols-1 border border-base-content/25 overflow-hidden divide-y divide-base-content/25">
                        {[...Array(5)].map((_, i) => (
                            <BlogCard key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <SectionHeader left  />
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
        </NavLayout>
    )
}

export default Homepage