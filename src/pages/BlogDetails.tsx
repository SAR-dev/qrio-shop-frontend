import NavLayout from '../layouts/NavLayout'
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { pb } from '../contexts/PocketContext';
import { Collections } from '../types/pocketbase';
import { TexpandBlogDetailsResType } from '../types/response';
import { getImageUrl } from '../helpers';
import NotFoundError from '../components/NotFoundError';
import DataFetchError from '../components/DataFetchError';
import Image from '../components/Image';

const BlogDetails = () => {
    const { slug } = useParams();

    const [blogDetails, setBlogDetails] = useState<TexpandBlogDetailsResType | null>(null)

    const [notFound, setNotFound] = useState(false)
    const [fetchError, setFetchError] = useState(false)

    useEffect(() => {
        if (slug?.length == 0) return;
        pb
            .collection(Collections.Blogs)
            .getFirstListItem(`slug="${slug}"`, {
                expand: "cover, images, author"
            })
            .then(res => setBlogDetails(res as unknown as TexpandBlogDetailsResType))
            .catch(err => {
                if (err.status == 404) {
                    setNotFound(true)
                    return;
                }
                setFetchError(err.status != 0)
            })
    }, [slug])

    if (notFound) return (
        <NavLayout>
            <NotFoundError />
        </NavLayout>
    )

    if (fetchError) return (
        <NavLayout>
            <DataFetchError />
        </NavLayout>
    )

    return (
        <NavLayout>
            {blogDetails && (
                <div className="max-w-screen-xl mx-auto px-5 py-12 grid grid-cols-1 gap-16">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                        <div className="shrink-0 w-full mx-auto h-fit lg:sticky top-[5rem]">
                            <div className="carousel rounded-box h-[28rem] w-full">
                                <div className="carousel-item h-full w-full">
                                    <Image
                                        className='w-full object-cover'
                                        src={getImageUrl({ id: blogDetails.expand.cover.id, filename: blogDetails.expand.cover.source })}
                                    />
                                </div>
                                {blogDetails.expand.images?.length > 0 && blogDetails.expand.images.map((image, i) => (
                                    <div id={image.id} className="carousel-item h-full w-full" key={i}>
                                        <Image
                                            className='w-full object-cover'
                                            src={getImageUrl({ id: image.id, filename: image.source })}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6 sm:mt-8 lg:mt-0">
                            <h1 className="text-2xl font-bold sm:text-3xl">
                                {blogDetails.title}
                            </h1>
                            <hr className="my-6 md:my-8 border-base-content/25" />
                            <div className="grid grid-cols-1 gap-4">
                                <p className='leading-7'>
                                    ✍️ {blogDetails.summary}
                                </p>
                            </div>
                            <hr className="my-6 md:my-8 border-base-content/25" />
                            <article className="prose text-base-content min-w-[fit-content]">
                                {parse(blogDetails.content)}
                            </article>
                            <div className='card gap-5 my-6 p-5 bg-base-300'>
                                <div className="flex gap-3 items-center">
                                    <div className="shrink-0 w-8">
                                        <img
                                            className='w-8 h-8 object-cover rounded-full'
                                            src={`${import.meta.env.VITE_API_URL}/api/files/${blogDetails.expand.author.collectionId}/${blogDetails.expand.author.id}/${blogDetails.expand.author.avatar}`}
                                        />
                                    </div>
                                    <div className='font-semibold'>{blogDetails.expand.author.name}</div>
                                    <div className="w-fit px-2 py-1 text-xs bg-primary text-primary-content">AUTHOR</div>
                                </div>
                                <div>
                                    {blogDetails.aboutAuthor}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </NavLayout>
    )
}

export default BlogDetails