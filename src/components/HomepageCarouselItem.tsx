import { HomepageCarousel } from '../types/response'
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from 'react-router';

const HomepageCarouselItem = ({ data }: { data: HomepageCarousel }) => {
    return (
        <div className="carousel-item w-full card bg-base-100 from-base-200 not-prose outline-base-content/5 relative overflow-hidden bg-gradient-to-b font-sans shadow-lg outline -outline-offset-1 md:flex-row-reverse">
            <figure className="max-md:bg-primary/10 isolate shrink-0 md:w-2/3">
                <img
                    className="pointer-events-none h-64 md:h-96 lg:h-[30rem]"
                    src={`${import.meta.env.VITE_API_URL}/api/files/images/${data.imageId}/${data.imageSource}`}
                />
            </figure>
            <div className="bg-primary-content -left-1/5 pointer-events-none absolute bottom-[-50%] aspect-square w-3/4 -translate-x-1/2 rounded-full opacity-20 blur-3xl" />
            <div className="bg-primary pointer-events-none absolute bottom-[-120%] left-1/2 aspect-square w-full -translate-x-1/2 rounded-full opacity-20 blur-3xl" />
            <div className="bg-base-100 pointer-events-none absolute -top-3/4 right-1/4 z-[1] aspect-square w-1/2 rounded-full opacity-60 blur-3xl" />
            <div className="card-body relative isolate z-[1]">
                <h2 className="card-title title text-base-content text-xl contrast-200 [text-wrap:balance] sm:w-[250%] sm:text-2xl md:text-4xl lg:text-3xl xl:text-4xl">
                    <span>
                        <span className="font-black">{data.title1}</span> <br />
                        <span className="font-black">{data.title2}</span>
                    </span>
                </h2>
                <div className="grow">
                    <h2 className="card-title text-sm font-light sm:w-[250%] sm:text-lg md:text-lg lg:text-lg xl:text-xl">
                        {data.subtitle}
                    </h2>
                </div>
                <Link className="btn btn-block btn-primary group" to={data.redirectTo}>
                    {data.buttonText}
                    <HiArrowLongRight className="hidden h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 md:inline-block" />
                </Link>
            </div>
        </div>
    )
}

export default HomepageCarouselItem