import { useState } from "react";
import { RiMenu2Fill, RiSearchLine, RiStarSmileLine } from "react-icons/ri";
import { GrBlog } from "react-icons/gr";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import Drawer from 'react-modern-drawer';
import { LuChevronRight } from "react-icons/lu";
import { RxExit } from "react-icons/rx";
import { Link, useNavigate } from "react-router";
import { usePocket } from "../contexts/PocketContext";
import LogoSvg from "../assets/logo.svg";
import { FcGoogle } from "react-icons/fc";
import { RiChatSmileAiLine } from "react-icons/ri";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useCartStore } from "../stores/cartStore";
import { constants } from "../constants";

const Navbar = () => {
    const { products } = useCartStore()
    const navigate = useNavigate()
    const { oAuthLogin, user, logout } = usePocket()
    const [showDrawer, setShowDrawer] = useState<boolean>(false)
    const toggleDrawer = () => {
        setShowDrawer((prevState) => !prevState)
    }
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const toggleSearch = () => {
        setShowSearch((prevState) => !prevState)
    }
    const [searchText, setSearchText] = useState("")

    const handleSignOut = () => {
        logout()
        window.location.reload();
    }

    return (
        <>
            <div className="sticky top-0 z-[2]">
                <div className="navbar bg-base-100 shadow border-b border-base-300">
                    <div className="navbar-start gap-2 font-semibold">
                        <button onClick={toggleDrawer}>
                            <RiMenu2Fill className="h-5 w-5" />
                        </button>
                        <Link to="/">
                            QRIO
                        </Link>
                    </div>
                    <div className="navbar-center">
                        <label className="input input-bordered input hidden lg:flex items-center gap-2 w-96">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Search products"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        navigate(`/products?${constants.FILTERS.SEARCH}=${searchText}`)
                                    }
                                }}
                            />
                            <RiSearchLine className="h-4 w-4 opacity-70" />
                        </label>
                    </div>
                    <div className="navbar-end gap-3">
                        <button onClick={toggleSearch} className="btn btn-outline border-base-content/25 lg:hidden">
                            <RiSearchLine className="h-5 w-5" />
                        </button>
                        {user ? (
                            <button className="btn btn-outline border-base-content/25 gap-2" onClick={toggleDrawer}>
                                <div className="w-5">
                                    <img
                                        className="h-5 w-5 rounded-full object-cover"
                                        src={`${import.meta.env.VITE_API_URL}/api/files/${user.collectionName}/${user.id}/${user.avatar}`}
                                    />
                                </div>
                                {user.name}
                            </button>
                        ) : (
                            <button className="btn btn-outline border-base-content/25 gap-2" onClick={oAuthLogin}>
                                <FcGoogle className="size-5" />
                                Continue with Google
                            </button>
                        )}
                        <div className="indicator">
                            <Link to="/shopping-cart" className="btn btn-outline border-base-content/25">
                                <FiShoppingCart className="h-5 w-5" />
                            </Link>
                            <span className="indicator-item indicator-bottom indicator-start badge badge-secondary h-8 w-8">{products.length}</span>
                        </div>
                    </div>
                </div>
                {!user && (
                    <div className="bg-base-100 shadow">
                        <div className="bg-primary/20 text-center py-2 lg:px-4 z-[2]">
                            <button onClick={oAuthLogin} className="py-2 xs:px-2 px-5 text-center bg-primary items-center text-primary-content leading-none xs:rounded-full flex xs:inline-flex group min-w-96 w-full xs:w-fit">
                                <span className="flex rounded-full bg-accent uppercase px-2 py-1 text-xs font-bold mr-3 text-info-content">
                                    Reminder
                                </span>
                                <span className="font-semibold mr-2 text-left flex-auto text-sm md:text-base">
                                    Sign in to get exclusive offers
                                </span>
                                <LuChevronRight className="opacity-75 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
                {showSearch && (
                    <div className="bg-base-300 shadow flex justify-center p-2">
                        <label className="input input-bordered input lg:hidden flex items-center gap-2 w-96">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Search products"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        navigate(`/products?${constants.FILTERS.SEARCH}=${searchText}`)
                                    }
                                }}
                            />
                            <RiSearchLine className="h-4 w-4 opacity-70" />
                        </label>
                    </div>
                )}
            </div>
            <Drawer
                open={showDrawer}
                onClose={toggleDrawer}
                direction='left'
                className=''
                duration={100}
            >
                <div className="h-full w-72 bg-base-200 flex flex-col justify-between">
                    <div>
                        <div className="w-full p-3 bg-base-100">
                            <Link to="/" className="flex items-center gap-3 font-extrabold tracking-widest title p-3">
                                <img src={LogoSvg} className="size-8" alt="" />
                                QRIO
                            </Link>
                        </div>
                        <div className="flex flex-col p-3">
                            <Link to="/products" className="no-animation btn gap-3 justify-start btn-primary bg-transparent text-base-content border-transparent hover:text-primary-content">
                                <FiShoppingBag className="size-5" />
                                Shop
                            </Link>
                            <Link to="/blogs" className="no-animation btn gap-3 justify-start btn-primary bg-transparent text-base-content border-transparent hover:text-primary-content">
                                <GrBlog className="size-5" />
                                Blogs
                            </Link>
                            <Link to="/shopping-cart" className="no-animation btn gap-3 justify-start btn-primary bg-transparent text-base-content border-transparent hover:text-primary-content">
                                <FiShoppingCart className="size-5" />
                                Cart & Wishlist
                            </Link>
                            <Link to="/order-history" className="no-animation btn gap-3 justify-start btn-primary bg-transparent text-base-content border-transparent hover:text-primary-content">
                                <MdOutlineShoppingCartCheckout className="size-5" />
                                Order History
                            </Link>
                            <button className="no-animation btn gap-3 justify-start btn-primary bg-transparent text-base-content border-transparent hover:text-primary-content">
                                <RiStarSmileLine className="size-5" />
                                About Us
                            </button>
                            <button className="no-animation btn gap-3 justify-start btn-primary bg-transparent text-base-content border-transparent hover:text-primary-content">
                                <RiChatSmileAiLine className="size-5" />
                                Contact Us
                            </button>
                        </div>
                    </div>
                    <div className="w-full p-3 bg-base-100">
                        <button className="no-animation w-full btn gap-3 justify-start btn-error bg-transparent text-base-content border-transparent hover:text-error-content" onClick={handleSignOut}>
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