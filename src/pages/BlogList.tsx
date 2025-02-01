import React, { useEffect, useState } from 'react'
import SectionLeftHeader from '../components/SectionLeftHeader'
import NavLayout from '../layouts/NavLayout'
import { useSearchParams } from 'react-router';
import { FilteredBlogResType } from '../types/response';
import { constants } from '../constants';
import { api } from '../helpers';
import BlogCard from '../components/BlogCard';

const pageSize = 20

const BlogList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [blogRes, setBlogRes] = useState<FilteredBlogResType | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [searchText, setSearchText] = useState(searchParams.get(constants.FILTERS.SEARCH) ?? "");

    useEffect(() => {
        setIsLoading(true)
        const pageNo = searchParams.get(constants.FILTERS.PAGE_NO)
        const search = searchParams.get(constants.FILTERS.SEARCH) ?? ""

        api
            .get("/api/blogs", {
                params: {
                    pageNo, pageSize, search
                }
            })
            .then(res => {
                setBlogRes(res.data)
                setIsLoading(false)
                window.scrollTo(0, 0)
            })
            .catch(() => {
                setBlogRes(null)
                setIsLoading(false)
            })
    }, [searchParams])

    const handleNext = () => {
        setSearchParams({
            search: searchParams.get(constants.FILTERS.SEARCH) ?? "",
            pageSize: pageSize.toString(),
            pageNo: (Number(searchParams.get(constants.FILTERS.PAGE_NO) ?? 1) + 1).toString()
        })
    }

    const handlePrev = () => {
        setSearchParams({
            search: searchParams.get(constants.FILTERS.SEARCH) ?? "",
            pageSize: pageSize.toString(),
            pageNo: (Number(searchParams.get(constants.FILTERS.PAGE_NO) ?? 2) - 1).toString()
        })
    }
    return (
        <NavLayout>
            <div className="max-w-screen-xl w-full mx-auto px-5 py-10 lg:py-12">
                <div className="mb-5">
                    <SectionLeftHeader title='🤗 WELCOME TO OUR BLOG' subtitle='Your Daily Dose of Knowledge and Inspiration. Stay Curious. Stay Informed.' />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 mb-10">
                    <label className="form-control w-full max-w-xs col-span-2 md:col-span-1">
                        <div className="label">
                            <span className="label-text">Search Text</span>
                            <span className="label-text-alt">Press 'Enter' to search</span>
                        </div>
                        <input
                            type='text'
                            disabled={isLoading}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setSearchParams({
                                        search: searchText,
                                    });
                                }
                            }}
                            className="input input-bordered"
                        />
                    </label>
                </div>
                <div className="card grid grid-cols-1 border border-base-content/25 overflow-hidden divide-y divide-base-content/25">
                    {blogRes?.items.map((data, i) => (
                        <BlogCard data={data} key={i} />
                    ))}
                </div>
                <div className="flex flex-col md:flex-row w-full gap-5 md:items-center md:justify-between mt-10">
                    <div className="opacity-50">
                        Total {blogRes?.totalItems ?? 0} blogs found . Showing page {blogRes?.pageNo ?? 1} of {blogRes?.totalPages ?? 1}
                    </div>
                    <div className="join grid grid-cols-2">
                        <button className="join-item btn btn-outline" disabled={!blogRes?.hasPrev} onClick={handlePrev}>Previous page</button>
                        <button className="join-item btn btn-outline" disabled={!blogRes?.hasNext} onClick={handleNext}>Next Page</button>
                    </div>
                </div>
            </div>
        </NavLayout>
    )
}

export default BlogList