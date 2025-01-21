import NavLayout from '../layouts/NavLayout'
import { FaPlus, FaStar } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'
import ProductCard from '../components/ProductCard'

const ProductDetails = () => {
    return (
        <NavLayout>
            <div className="max-w-screen-xl mx-auto px-5 py-12 grid grid-cols-1 gap-16">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                    <div className="shrink-0 w-full mx-auto">
                        <div className="carousel carousel-vertical rounded-box h-96 w-full">
                            <div className="carousel-item h-full w-full">
                                <img className='w-full object-cover' src="https://www.wallpaperflare.com/static/550/72/960/princess-guardian-boy-and-girl-anime-wallpaper.jpg" />
                            </div>
                            <div className="carousel-item h-full w-full">
                                <img className='w-full object-cover' src="https://c4.wallpaperflare.com/wallpaper/398/178/557/chibi-console-death-figure-wallpaper-preview.jpg" />
                            </div>
                            <div className="carousel-item h-full w-full">
                                <img className='w-full object-cover' src="https://c0.wallpaperflare.com/preview/991/730/575/miku-young-lady-girl.jpg" />
                            </div>
                            <div className="carousel-item h-full w-full">
                                <img className='w-full object-cover' src="https://c0.wallpaperflare.com/preview/852/702/359/young-lady-girl-female.jpg" />
                            </div>
                            <div className="carousel-item h-full w-full">
                                <img className='w-full object-cover' src="https://c0.wallpaperflare.com/preview/174/793/281/young-lady-female-girl.jpg" />
                            </div>
                            <div className="carousel-item h-full w-full">
                                <img className='w-full object-cover' src="https://c1.wallpaperflare.com/preview/919/908/852/hare-evil-bank-snowball.jpg" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 sm:mt-8 lg:mt-0">
                        <h1 className="text-xl font-semibold sm:text-2xl">
                            Apple iMac 24" All-In-One Computer, Apple M1, 8GB RAM, 256GB SSD, Mac
                            OS, Pink
                        </h1>
                        <div className="mt-4 flex gap-5">
                            <div className="w-fit bg-secondary text-secondary-content py-1 px-2 text-xs">Save TK 100</div>
                            <div className='line-through'>TK 1,249.99</div>
                        </div>
                        <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                            <p className="title text-2xl font-extrabold sm:text-3xl">
                                TK 1,249.99
                            </p>
                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <div className="flex items-center gap-1">
                                    <FaStar className="size-4 text-yellow-400" />
                                    <FaStar className="size-4 text-yellow-400" />
                                    <FaStar className="size-4 text-yellow-400" />
                                    <FaStar className="size-4 text-yellow-400" />
                                    <FaStar className="size-4 text-yellow-400" />
                                </div>
                                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                                    (5.0)
                                </p>
                                <a href="#" className="text-sm font-medium leading-none underline hover:no-underline">
                                    345 Reviews
                                </a>
                            </div>
                        </div>
                        <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                            <button className="btn btn-outline btn-primary">
                                <FiHeart className='size-5' />
                                Add to favorites
                            </button>
                            <button className="btn btn-primary">
                                <FaPlus className='size-5' />
                                Add to cart
                            </button>
                        </div>
                        <hr className="my-6 md:my-8 border-base-content/25" />
                        <div className="grid grid-cols-1 gap-6">
                            <p>
                                Studio quality three mic array for crystal clear calls and voice
                                recordings. Six-speaker sound system for a remarkably robust and
                                high-quality audio experience. Up to 256GB of ultrafast SSD storage.
                            </p>
                            <p>
                                Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast Wi-Fi
                                6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with Magic
                                Keyboard or Magic Keyboard with Touch ID.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="join join-vertical w-full">
                    {[...Array(4)].map((_, i) => (
                        <div className="collapse collapse-arrow join-item border-base-content/25 border" key={i}>
                            <input type="radio" name="accordion" defaultChecked={i == 0} />
                            <div className="collapse-title text-lg font-medium">Overview</div>
                            <div className="collapse-content">
                                <div className="flex flex-col gap-2">
                                    <p>Studio quality three mic array for crystal clear calls and voice recordings. Six-speaker sound system for a remarkably robust and high-quality audio experience. Up to 256GB of ultrafast SSD storage.</p>
                                    <p>Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with Magic Keyboard or Magic Keyboard with Touch ID.</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="card flex flex-col lg:flex-row gap-5 items-center border border-base-content/25 p-5">
                    <div className="flex flex-col gap-3 mr-auto">
                        <div className='text-xl'>
                            Apple iMac 24" All-In-One Computer, Apple M1, 8GB RAM, 256GB SSD, Mac
                            OS, Pink
                        </div>
                        <div className="text-xl font-bold">
                            TK 1,249.99
                        </div>
                    </div>
                    <div className="flex gap-5 ml-auto w-full lg:w-fit">
                        <button className="btn btn-outline btn-primary">
                            <FiHeart className='size-5' />
                            Add to favorites
                        </button>
                        <button className="btn btn-primary">
                            <FaPlus className='size-5' />
                            Add to cart
                        </button>
                    </div>
                </div>
                <div>
                    <SectionHeader left />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {[...Array(4)].map((_, i) => (
                            <ProductCard key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </NavLayout>
    )
}

export default ProductDetails