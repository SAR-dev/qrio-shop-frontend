import { useState } from "react";
import { RiMenu2Fill, RiSearchLine, RiNotificationLine, RiExchangeFundsFill } from "react-icons/ri";
import { GrBlog } from "react-icons/gr";
import { LuBadgeHelp } from "react-icons/lu";
import { PiContactlessPaymentLight } from "react-icons/pi";
import { FiShoppingBag, FiShoppingCart, FiHeart } from "react-icons/fi";
import { BsCartPlus } from "react-icons/bs";
import { TbTagMinus } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineSupportAgent } from "react-icons/md";
import { TbCardboards } from "react-icons/tb";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import PromotionProductCard from "../components/PromotionProductCard";

const Homepage = () => {
    const [showDrawer, setShowDrawer] = useState<boolean>(false)
    const toggleDrawer = () => {
        setShowDrawer((prevState) => !prevState)
    }

    return (
        <div>
            <div className="navbar bg-base-100 border-b border-base-300">
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
                <div className="navbar-end">
                    <label className="input input-bordered flex items-center gap-2 mr-3 hidden lg:flex">
                        <input type="text" className="grow" placeholder="Search products" />
                        <RiSearchLine className="h-4 w-4 opacity-70" />
                    </label>
                    <button className="btn btn-ghost btn-circle">
                        <GrBlog className="h-5 w-5" />
                    </button>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <RiNotificationLine className="h-5 w-5" />
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                </div>
            </div>
            <div className="drawer">
                <div className="drawer-side"></div>
            </div>
            <Drawer
                open={showDrawer}
                onClose={toggleDrawer}
                direction='left'
                className=''
            >
                <div className="flex flex-col">
                    <label className="input input-bordered rounded-none flex items-center gap-2 px-5">
                        <input type="text" className="grow" placeholder="Search" />
                        <RiSearchLine className="h-4 w-4 opacity-70" />
                    </label>
                    <button className="btn gap-3 rounded-none justify-start">
                        <FiShoppingBag className="h-4 w-4" />
                        Shop
                    </button>
                    <button className="btn gap-3 rounded-none justify-start">
                        <GrBlog className="h-4 w-4" />
                        Blogs
                    </button>
                    <button className="btn gap-3 rounded-none justify-start">
                        <FiShoppingCart className="h-4 w-4" />
                        Cart
                    </button>
                    <button className="btn gap-3 rounded-none justify-start">
                        <LuBadgeHelp className="h-4 w-4" />
                        About Us
                    </button>
                    <button className="btn gap-3 rounded-none justify-start">
                        <PiContactlessPaymentLight className="h-4 w-4" />
                        Contact Us
                    </button>
                </div>
            </Drawer>
            <div className="max-w-screen-xl mx-auto px-5 py-12 grid grid-cols-1 gap-12">
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
                            <p className="text-lg mt-4 text-slate-600 max-w-xl">
                                Astroship is a starter template for startups, marketing websites &amp;
                                landing pages.
                                <wbr /> Built with Astro.build and TailwindCSS. You can quickly create any
                                website with this starter.
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <button className="btn btn-neutral btn-lg sm:w-1/2 lg:w-auto shadow-none">
                                    Shop Now
                                </button>
                                <button className="btn btn-neutral btn-outline btn-lg sm:w-1/2 lg:w-auto">
                                    Explore
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 pb-20">
                    <div className="flex flex-col gap-3">
                        <TbTruckDelivery className="size-16" />
                        <div className="font-semibold">Free Shipping</div>
                        <div className="hidden md:block">It's not actually free we just price it into the products. Someone's paying for it, and it's not us.</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <RiExchangeFundsFill className="size-16" />
                        <div className="font-semibold">Exchanges</div>
                        <div className="hidden md:block">It's not actually free we just price it into the products. Someone's paying for it, and it's not us.</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <MdOutlineSupportAgent className="size-16" />
                        <div className="font-semibold">Customer Support</div>
                        <div className="hidden md:block">It's not actually free we just price it into the products. Someone's paying for it, and it's not us.</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <TbCardboards className="size-16" />
                        <div className="font-semibold">Gift Cards</div>
                        <div className="hidden md:block">It's not actually free we just price it into the products. Someone's paying for it, and it's not us.</div>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {[...Array(2)].map((_, i) => (
                            <PromotionProductCard key={i} />
                        )) }
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
                                    <button className="absolute end-4 top-4 z-10 rounded-full btn btn-square btn-sm translate-x-16 group-hover:translate-x-0 transition duration-300">
                                        <span className="sr-only">Wishlist</span>
                                        <FiHeart className="size-4" />
                                    </button>
                                    <div className="absolute bottom-0 left-0 m-2 card bg-white px-2 -translate-x-96 group-hover:translate-x-0 transition duration-300">You can't stop me 🤭</div>
                                </div>
                                <div className="py-3 flex flex-col gap-3">
                                    <div className="flex justify-between">
                                        <div className="card flex-row gap-2 bg-warning text-sm text-warning-content font-semibold tracking-wider leading-6 flex items-center h-6 w-fit px-3">
                                            BDT 400
                                        </div>
                                        <div className="text-sm font-semibold text-error flex items-center gap-1">
                                            <TbTagMinus className="h-4 w-4" />
                                            -25%
                                        </div>
                                    </div>
                                    <button className="btn btn-neutral group-hover:btn-warning w-full text-xs shadow-none space-x-2 group-hover:ring-2 group-hover:ring-warning group-hover:ring-offset-2 transition duration-300">
                                        <BsCartPlus className="h-4 w-4" />
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {[...Array(2)].map((_, i) => (
                            <PromotionProductCard key={i} />
                        )) }
                    </div>
                </div>
                <div>
                    <div className="text-3xl font-bold tracking-wide text-center mb-3">FEATURED CATEGORIES</div>
                    <div className="text-center text-base-content opacity-80 mb-8 text-lg">
                        Visit our most popular categories which is mind-blowing
                    </div>
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {[...Array(2)].map((_, i) => (
                            <PromotionProductCard key={i} />
                        )) }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage