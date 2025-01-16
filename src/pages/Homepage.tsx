import PromotionProductCard from "../components/PromotionProductCard";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { FcInTransit } from "react-icons/fc";
import { HiArrowLongRight } from "react-icons/hi2";
import { GiTravelDress } from "react-icons/gi";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import NavLayout from "../layouts/NavLayout";
import SectionHeader from "../components/SectionHeader";

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
                <div>
                    <SectionHeader />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[...Array(4)].map((_, i) => (
                            <PromotionProductCard key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <SectionHeader />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {[...Array(8)].map((_, i) => (
                            <ProductCard key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <SectionHeader />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[...Array(4)].map((_, i) => (
                            <PromotionProductCard key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <SectionHeader />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {[...Array(8)].map((_, i) => (
                            <ProductCard key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <SectionHeader />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[...Array(4)].map((_, i) => (
                            <PromotionProductCard key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <SectionHeader />
                    <div className="card grid grid-cols-1 border border-base-content/25 overflow-hidden divide-y divide-base-content/25">
                        {[...Array(5)].map((_, i) => (
                            <BlogCard key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <SectionHeader />
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

            <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
                <nav className="grid grid-flow-col gap-4">
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a>
                            <FaTwitter className="size-6" />
                        </a>
                        <a>
                            <FaYoutube className="size-6" />
                        </a>
                        <a>
                            <FaFacebook className="size-6" />
                        </a>
                    </div>
                </nav>
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
                </aside>
            </footer>
            <footer className="footer bg-neutral text-neutral-content items-center justify-center p-4">
                <aside className="grid-flow-col items-center">
                    <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        className="fill-current">
                        <path
                            d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                    </svg>
                    <p>Created By WebDev-Craft Team</p>
                </aside>
            </footer>
        </NavLayout>
    )
}

export default Homepage