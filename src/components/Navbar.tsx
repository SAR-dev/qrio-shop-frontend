import { useState } from "react";
import { RiMenu2Fill, RiSearchLine } from "react-icons/ri";
import { GrBlog } from "react-icons/gr";
import { LuBadgeHelp } from "react-icons/lu";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import Drawer from 'react-modern-drawer';
import { TbMessageChatbot } from "react-icons/tb";
import { LuChevronRight } from "react-icons/lu";
import { FcStumbleupon } from "react-icons/fc";
import { RxExit } from "react-icons/rx";
import { Link } from "react-router";

const Navbar = () => {
    const [showDrawer, setShowDrawer] = useState<boolean>(false)
    const toggleDrawer = () => {
        setShowDrawer((prevState) => !prevState)
    }

    return (
        <>
            <div className="sticky top-0 z-[2]">
                <div className="navbar bg-base-100 shadow border-b border-base-300">
                    <div className="navbar-start gap-2 font-semibold">
                        <button onClick={toggleDrawer}>
                            <RiMenu2Fill className="h-5 w-5" />
                        </button>
                        QRIO
                    </div>
                    <div className="navbar-center">
                        <label className="input input-bordered input hidden lg:flex items-center gap-2 w-96">
                            <input type="text" className="grow" placeholder="Search products" />
                            <RiSearchLine className="h-4 w-4 opacity-70" />
                        </label>
                    </div>
                    <div className="navbar-end gap-3">
                        <button className="btn btn-outline border-base-content/25 lg:hidden">
                            <RiSearchLine className="h-5 w-5" />
                        </button>
                        <button className="btn btn-outline border-base-content/25 gap-2">
                            <div className="w-5">
                                <img className="h-5 w-5 rounded-full object-cover" src="https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png" alt="" />
                            </div>
                            Sayed Rafi
                        </button>
                        <Link to="/shopping-cart" className="btn btn-outline border-base-content/25">
                            <FiShoppingCart className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
                <div className="bg-base-100 shadow">
                    <div className="bg-primary/20 text-center py-2 lg:px-4 z-[2]">
                        <Link to="/" className="py-2 lg:px-2 px-5 text-center bg-primary items-center text-primary-content leading-none lg:rounded-full flex lg:inline-flex group">
                            <span className="flex rounded-full bg-accent uppercase px-2 py-1 text-xs font-bold mr-3 text-info-content">
                                Reminder
                            </span>
                            <span className="font-semibold mr-2 text-left flex-auto text-sm md:text-base">
                                Sign in to get exclusive offers
                            </span>
                            <LuChevronRight className="opacity-75 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
            <Drawer
                open={showDrawer}
                onClose={toggleDrawer}
                direction='left'
                className=''
            >
                <div className="h-full w-72 bg-base-200 flex flex-col justify-between">
                    <div className="flex flex-col gap-2 p-3">
                        <div className="flex items-center gap-3 font-extrabold tracking-widest title p-3">
                            <FcStumbleupon className="size-8" />
                            QRIO
                        </div>
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
                    <div className="w-full border-t border-base-content/25 p-3">
                        <button className="w-full btn gap-3 justify-start">
                            <RxExit className="size-5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default Navbar