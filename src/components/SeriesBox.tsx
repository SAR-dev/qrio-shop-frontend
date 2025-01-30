import { FeaturedSeries } from "../types/response"
import { getImageUrl } from "../helpers"
import SeriesBoxProduct from "./SeriesBoxProduct"
import SectionLeftHeader from "./SectionLeftHeader"

const SeriesBox = ({ data }: { data: FeaturedSeries }) => {
    return (
        <div className="w-full card overflow-hidden gap-5 grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-5">
                <SectionLeftHeader title={data.tagLine} />
            </div>
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
                    <button className="btn glass">
                        {data.seriesTitle}
                    </button>
                </div>
            </div>
            <div className="md:col-span-2 h-64 md:h-96">
                <div className="grid grid-cols-2 grid-rows-2 gap-3 h-64 md:h-96">
                    {data.products.map((product, i) => (
                        <SeriesBoxProduct product={product} key={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SeriesBox