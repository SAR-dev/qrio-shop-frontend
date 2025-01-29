import { Link } from "react-router"
import { getImageUrl } from "../helpers"
import { BlogData } from "../types/response"

const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

const BlogCard = ({ data }: { data: BlogData }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-5 group">
            {data.blogImageId.length > 0 ? (
                <img
                    className="h-64 w-full lg:w-96 object-cover"
                    src={getImageUrl({ id: data.blogImageId, filename: data.blogImageSource })}
                />
            ) : (
                <div className="h-64 w-full lg:w-96 bg-base-content/50 animate-pulse" />
            )}

            <div className="flex flex-col gap-5 p-5">
                <div className="text-primary leading-4 uppercase title font-bold uppercase">{data.category}</div>
                <div className="text-xl font-extrabold uppercase title">{data.title}</div>
                <div className="">
                    {data.summary}
                </div>
                <div className="flex w-full justify-between items-center">
                    <Link className="text-sm font-semibold text-success w-fit" to={`/blogs/${data.slug}`}>
                        Continue Reading
                    </Link>
                    <div className="flex items-center opacity-50 text-sm">
                        Published on {(new Date(data.publishedAt)).toLocaleDateString(undefined, dateOptions)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard