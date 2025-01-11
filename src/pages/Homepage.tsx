import { useState } from "react";
import { RiMenu2Fill, RiSearchLine, RiExchangeFundsFill } from "react-icons/ri";
import { GrBlog } from "react-icons/gr";
import { LuBadgeHelp } from "react-icons/lu";
import { FiShoppingBag, FiShoppingCart, FiHeart } from "react-icons/fi";
import { BsCartPlus } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineExplore, MdOutlineSupportAgent } from "react-icons/md";
import { TbCardboards } from "react-icons/tb";
import Drawer from 'react-modern-drawer';
import PromotionProductCard from "../components/PromotionProductCard";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { TbMessageChatbot } from "react-icons/tb";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import BlogCard from "../components/BlogCard";

const Homepage = () => {
    const [showDrawer, setShowDrawer] = useState<boolean>(false)
    const toggleDrawer = () => {
        setShowDrawer((prevState) => !prevState)
    }

    return (
        <div>
            <div className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-[2]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <button className="btn btn-ghost btn-circle" onClick={toggleDrawer}>
                            <RiMenu2Fill className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost text-xl">QRIO</a>
                </div>
                <div className="navbar-end gap-3">
                    <label className="input input-bordered flex items-center gap-2 mr-3 hidden lg:flex">
                        <input type="text" className="grow" placeholder="Search products" />
                        <RiSearchLine className="h-4 w-4 opacity-70" />
                    </label>
                    <button className="btn btn-ghost btn-circle">
                        <GrBlog className="h-5 w-5" />
                    </button>
                    <ThemeSwitcher />
                </div>
            </div>
            <Drawer
                open={showDrawer}
                onClose={toggleDrawer}
                direction='left'
                className=''
            >
                <div className="h-full bg-base-200 p-3">
                    <div className="flex flex-col gap-1">
                        <label className="input input-bordered flex items-center gap-2 px-5">
                            <input type="text" className="grow" placeholder="Search" />
                        </label>
                        <button className="btn gap-3 justify-start">
                            <FiShoppingBag className="size-5" />
                            Shop
                        </button>
                        <button className="btn gap-3 justify-start">
                            <GrBlog className="size-5" />
                            Blogs
                        </button>
                        <button className="btn gap-3 justify-start">
                            <FiShoppingCart className="size-5" />
                            Cart
                        </button>
                        <button className="btn gap-3 justify-start">
                            <LuBadgeHelp className="size-5" />
                            About Us
                        </button>
                        <button className="btn gap-3 justify-start">
                            <TbMessageChatbot className="size-5" />
                            Contact Us
                        </button>
                    </div>
                </div>
            </Drawer>
            <div className="max-w-screen-xl mx-auto px-5 py-12 grid grid-cols-1 gap-20">
                <div>
                    <div className="grid lg:grid-cols-2 place-items-center">
                        <div className="md:py-6 lg:order-1 md:block">
                            <picture>
                                <img
                                    src="https://astroship.web3templates.com/_astro/hero.DlKDY3ml_Z1VhsC8.webp"
                                    alt="Astronaut in the air"
                                    className="h-64 lg:h-auto"
                                />
                            </picture>
                        </div>
                        <div>
                            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight xl:tracking-tighter">
                                Deep rooted passion for Science
                            </h1>
                            <p className="text-lg mt-4 text-base-content/75 lg:max-w-xl">
                                Astroship is a starter template for startups, marketing websites &amp;
                                landing pages.
                                <wbr /> Built with Astro.build and TailwindCSS. You can quickly create any
                                website with this starter.
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <button className="btn btn-neutral btn-lg sm:w-1/2 lg:w-auto shadow-none gap-3">
                                    <MdOutlineShoppingCart className="size-8" />
                                    Shop Now
                                </button>
                                <button className="btn btn-neutral btn-outline btn-lg sm:w-1/2 lg:w-auto gap-3">
                                    <MdOutlineExplore className="size-8" />
                                    Explore Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 xl:pb-20">
                    <div className="flex flex-col gap-3">
                        <TbTruckDelivery className="size-16" />
                        <div className="font-semibold">Free Shipping</div>
                        <div className="hidden md:block">It's not actually free we just price it into the products. Someone's paying for it, and it's not us.</div>
                    </div>
                    <div className="flex flex-col gap-3 items-end xl:items-start">
                        <RiExchangeFundsFill className="size-16" />
                        <div className="font-semibold">Exchanges</div>
                        <div className="hidden md:block">It's not actually free we just price it into the products. Someone's paying for it, and it's not us.</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <MdOutlineSupportAgent className="size-16" />
                        <div className="font-semibold">Customer Support</div>
                        <div className="hidden md:block">It's not actually free we just price it into the products. Someone's paying for it, and it's not us.</div>
                    </div>
                    <div className="flex flex-col gap-3 items-end xl:items-start">
                        <TbCardboards className="size-16" />
                        <div className="font-semibold">Gift Cards</div>
                        <div className="hidden md:block">It's not actually free we just price it into the products. Someone's paying for it, and it's not us.</div>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[...Array(2)].map((_, i) => (
                            <PromotionProductCard key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <div className="text-3xl font-bold tracking-wide text-center mb-3">FEATURED PRODUCTS</div>
                    <div className="text-center text-base-content opacity-80 mb-8 text-lg">
                        Visit our most popular categories which is mind-blowing
                    </div>
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {[...Array(8)].map((_, i) => (
                            <div className="group" key={i}>
                                <div className="card h-64 sm:h-72 w-full relative overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a"
                                        alt=""
                                        className="absolute top-0 left-0 h-64 w-full object-cover opacity-100 group-hover:opacity-0 sm:h-72"
                                    />
                                    <img
                                        src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a"
                                        alt=""
                                        className="absolute top-0 left-0 h-64 w-full object-cover opacity-0 group-hover:opacity-100 sm:h-72 transform scale-x-[-1]"
                                    />
                                    <button className="absolute end-4 top-4 z-[1] rounded-full btn btn-square btn-sm btn-secondary translate-x-16 group-hover:translate-x-0 transition duration-300">
                                        <span className="sr-only">Wishlist</span>
                                        <FiHeart className="size-4" />
                                    </button>
                                    <div className="absolute bottom-0 left-0 m-2 card bg-white shadow-lg text-black px-2 -translate-x-96 group-hover:translate-x-0 transition duration-300">You can't stop me 🤭</div>
                                </div>
                                <div className="py-3 flex flex-col gap-3">
                                    <div className="flex justify-between">
                                        <div className="card flex-row bg-warning text-sm text-warning-content font-semibold tracking-wider leading-6 items-center h-6 w-fit px-3">
                                            BDT 400
                                        </div>
                                        <div className="text-sm line-through">BDT 500</div>
                                    </div>
                                    <button className="btn btn-neutral group-hover:btn-warning w-full text-xs shadow-none space-x-2 hover:ring-2 hover:ring-warning hover:ring-offset-2 hover:ring-offset-base-100 transition duration-300">
                                        <BsCartPlus className="h-4 w-4" />
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[...Array(2)].map((_, i) => (
                            <PromotionProductCard key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <div className="text-3xl font-bold tracking-wide text-center mb-3">FEATURED CATEGORIES</div>
                    <div className="text-center text-base-content opacity-80 mb-8 text-lg">
                        Visit our most popular categories which is mind-blowing
                    </div>
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 text-black text-xl font-semibold">
                        <div className="grid gap-4">
                            <div className="relative">
                                <img
                                    className="h-auto max-w-full card"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                                    alt=""
                                />
                                <div className="absolute bottom-0 m-3">Canva</div>
                            </div>
                            <div className="relative">
                                <img
                                    className="h-auto max-w-full card"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
                                    alt=""
                                />
                                <div className="absolute bottom-0 m-3">Canva</div>
                            </div>
                            <div className="relative">
                                <img
                                    className="h-auto max-w-full card"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                                    alt=""
                                />
                                <div className="absolute bottom-0 m-3">Canva</div>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="relative">
                                <img
                                    className="h-auto max-w-full card"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
                                    alt=""
                                />
                                <div className="absolute bottom-0 m-3">Canva</div>
                            </div>
                            <div className="relative">
                                <img
                                    className="h-auto max-w-full card"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
                                    alt=""
                                />
                                <div className="absolute bottom-0 m-3">Canva</div>
                            </div>
                            <div className="relative">
                                <img
                                    className="h-auto max-w-full card"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
                                    alt=""
                                />
                                <div className="absolute bottom-0 m-3">Canva</div>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="relative">
                                <img
                                    className="h-auto max-w-full card"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
                                    alt=""
                                />
                                <div className="absolute bottom-0 m-3">Canva</div>
                            </div>
                            <div className="relative">
                                <img
                                    className="h-auto max-w-full card"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                                    alt=""
                                />
                                <div className="absolute bottom-0 m-3">Canva</div>
                            </div>
                            <div className="relative">
                                <img
                                    className="h-auto max-w-full card"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                                    alt=""
                                />
                                <div className="absolute bottom-0 m-3">Canva</div>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="relative">
                                <img
                                    className="h-auto max-w-full card"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
                                    alt=""
                                />
                                <div className="absolute bottom-0 m-3">Canva</div>
                            </div>
                            <div className="relative">
                                <img
                                    className="h-auto max-w-full card"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
                                    alt=""
                                />
                                <div className="absolute bottom-0 m-3">Canva</div>
                            </div>
                            <div className="relative">
                                <img
                                    className="h-auto max-w-full card"
                                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                                    alt=""
                                />
                                <div className="absolute bottom-0 m-3">Canva</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[...Array(2)].map((_, i) => (
                            <PromotionProductCard key={i} />
                        ))}
                    </div>
                </div>
                <div>
                    <div className="text-3xl font-bold tracking-wide text-center mb-3">Recent Blogs</div>
                    <div className="text-center text-base-content opacity-80 mb-8 text-lg">
                        Visit our most popular categories which is mind-blowing
                    </div>
                    <div className="card grid grid-cols-1 border border-base-content/25 overflow-hidden divide-y divide-base-content/25">
                        {[...Array(5)].map((_, i) => (
                            <BlogCard key={i} />
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
            <footer className="footer bg-neutral text-neutral-content items-center p-4">
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
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>
                <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                    </a>
                </nav>
            </footer>
        </div>
    )
}

export default Homepage