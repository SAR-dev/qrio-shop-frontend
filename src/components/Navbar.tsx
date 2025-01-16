import { useState } from "react";
import { RiMenu2Fill, RiSearchLine } from "react-icons/ri";
import { GrBlog } from "react-icons/gr";
import { LuBadgeHelp } from "react-icons/lu";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import Drawer from 'react-modern-drawer';
import { TbMessageChatbot } from "react-icons/tb";
import { LuChevronRight } from "react-icons/lu";

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
                        <button className="btn btn-outline border-base-content/25">
                            <FiShoppingCart className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div className="bg-base-100 shadow">
                    <div className="bg-primary/20 text-center py-2 lg:px-4 z-[2]">
                        <div className="py-2 px-5 text-center bg-primary items-center text-primary-content leading-none lg:rounded-full flex lg:inline-flex">
                            <span className="flex rounded-full bg-accent uppercase px-2 py-1 text-xs font-bold mr-3 text-info-content">
                                Reminder
                            </span>
                            <span className="font-semibold mr-2 text-left flex-auto text-sm md:text-base">
                                Sign in with social accounts to get exclusive offers
                            </span>
                            <LuChevronRight className="opacity-75 h-4 w-4" />
                        </div>
                    </div>
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
        </>
    )
}

export default Navbar