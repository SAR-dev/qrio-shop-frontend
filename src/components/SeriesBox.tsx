import { Link } from "react-router"
import { FeaturedSeries } from "../types/response-types"
import { getImageUrl } from "../helpers"

const SeriesBox = ({ data }: { data: FeaturedSeries }) => {
    return (
        <div className="w-full card overflow-hidden p-3 gap-3 grid grid-cols-1 md:grid-cols-5 bg-gradient-to-tr from-primary/25 to-base-100/50">
            <div className="h-64 md:h-96 md:col-span-3 relative">
                {data.seriesImageId.length > 0 ? (
                    <img 
                        className="w-full h-64 md:h-96 object-cover card" 
                        src={getImageUrl({ id: data.seriesImageId, filename: data.seriesImageSource })} 
                    />
                ) : (
                    <div className="w-full h-64 md:h-96 object-cover card bg-base-content/50 animate-pulse" />
                )}
                <div className="absolute bottom-0 left-0 m-3">
                    <button className="btn btn-primary">{data.tagLine}</button>
                </div>
            </div>
            <div className="md:col-span-2 h-64 md:h-96">
                <div className="grid grid-cols-2 grid-rows-2 gap-3 h-64 md:h-96">
                    {data.products.map((product, i) => (
                        <Link to="/products/1" className="h-full w-full card overflow-hidden group relative" key={i}>
                            {product.productImageId.length > 0 ? (
                                <img
                                    className="h-full w-full object-cover transition duration-150 ease-in-out group-hover:scale-110 lg:group-hover:rotate-3"
                                    src={getImageUrl({ id: product.productImageId, filename: product.productImageSource })}
                                />
                            ) : (
                                <div className="h-full w-full bg-base-content/50 animate-pulse transition duration-150 ease-in-out group-hover:scale-110 lg:group-hover:rotate-3" />
                            )}
                            <div className="absolute bottom-0 left-0 m-2 bg-success text-success-content text-xs py-1 px-2">TK {product.productPrice}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SeriesBox