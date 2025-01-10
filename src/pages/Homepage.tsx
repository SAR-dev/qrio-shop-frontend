import { useState } from "react";
import { RiMenu2Fill, RiSearchLine, RiNotificationLine } from "react-icons/ri";
import { GrBlog } from "react-icons/gr";
import { LuBadgeHelp } from "react-icons/lu";
import { PiContactlessPaymentLight } from "react-icons/pi";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

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
            <div className="pb-12">
                <div className="max-w-screen-xl mx-auto px-5">
                    <main className="grid lg:grid-cols-2 place-items-center py-12">
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
                                <button className="btn btn-neutral btn-lg sm:w-1/2 lg:w-auto">
                                    Shop Now
                                </button>
                                <button className="btn btn-neutral btn-outline btn-lg sm:w-1/2 lg:w-auto">
                                    Explore
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
                <div className="max-w-screen-xl mx-auto px-5">
                    <div className="grid grid-rows-2 grid-cols-4 gap-5">
                        <div className="card row-span-2 col-span-2 border border-base-300 aspect-square relative group overflow-hidden">
                            <img className="absolute h-full w-full object-center group-hover:scale-110 transition ease-in-out" src="https://qrioshop.com/wp-content/uploads/2024/10/5-300x300.jpg" alt="" />
                            <div className="uppercase absolute bottom-0 left-0 p-5 text-2xl font-semibold group-hover:-translate-y-5 transition ease-in-out">Avengers</div>
                            <div className="absolute bottom-0 left-0 px-5 translate-y-5 group-hover:-translate-y-3 transition ease-in-out">6 Products</div>
                        </div>
                        {[...Array(4)].map((_, i) => (
                            <div className="card border border-base-300 aspect-square relative group overflow-hidden" key={i}>
                                <img className="absolute h-full w-full object-center group-hover:scale-110 transition ease-in-out" src="https://qrioshop.com/wp-content/uploads/2024/10/5-300x300.jpg" alt="" />
                                <div className="uppercase absolute bottom-0 left-0 p-5 text-2xl font-semibold group-hover:-translate-y-5 transition ease-in-out">Avengers</div>
                            <div className="absolute bottom-0 left-0 px-5 translate-y-5 group-hover:-translate-y-3 transition ease-in-out">6 Products</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage