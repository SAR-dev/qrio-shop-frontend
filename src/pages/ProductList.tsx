import NavLayout from '../layouts/NavLayout'
import SectionLeftHeader from '../components/SectionLeftHeader'
import { useLocalStorage } from 'usehooks-ts'
import { FilteredProductResType, FilterFieldResType } from '../types/response';
import { constants } from '../constants'
import { useEffect, useState } from 'react'
import { api } from '../helpers'
import { useSearchParams } from 'react-router'
import ProductCard from '../components/ProductCard';

const pageSize = 20

function ProductList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterFieldData, setFilterFieldData] = useLocalStorage<FilterFieldResType | null>(constants.FILTER_FIELDS_DATA_STORE_KEY, null);
    const [productRes, setProductRes] = useState<FilteredProductResType | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [searchText, setSearchText] = useState(searchParams.get(constants.FILTERS.SEARCH) ?? "");

    useEffect(() => {
        api
            .get("/api/filter-fields")
            .then(res => setFilterFieldData(res.data as unknown as FilterFieldResType))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        setIsLoading(true)
        const pageNo = searchParams.get(constants.FILTERS.PAGE_NO)
        const search = searchParams.get(constants.FILTERS.SEARCH) ?? ""
        const seriesId = filterFieldData?.seriesList.find(e => e.id == searchParams.get(constants.FILTERS.SERIES_ID))?.id ?? ""
        const categoryId = filterFieldData?.categoryList.find(e => e.id == searchParams.get(constants.FILTERS.CATEGORY_ID))?.id ?? ""

        api
            .get("/api/products", {
                params: {
                    seriesId, categoryId, pageNo, pageSize, search
                }
            })
            .then(res => {
                setProductRes(res.data)
                setIsLoading(false)
                window.scrollTo(0, 0)
            })
            .catch(() => {
                setProductRes(null)
                setIsLoading(false)
            })
    }, [searchParams])

    const handleNext = () => {
        setSearchParams({
            seriesId: searchParams.get(constants.FILTERS.SERIES_ID) ?? "",
            categoryId: searchParams.get(constants.FILTERS.CATEGORY_ID) ?? "",
            search: searchParams.get(constants.FILTERS.SEARCH) ?? "",
            pageSize: pageSize.toString(),
            pageNo: (Number(searchParams.get(constants.FILTERS.PAGE_NO) ?? 1) + 1).toString()
        })
    }

    const handlePrev = () => {
        setSearchParams({
            seriesId: searchParams.get(constants.FILTERS.SERIES_ID) ?? "",
            categoryId: searchParams.get(constants.FILTERS.CATEGORY_ID) ?? "",
            search: searchParams.get(constants.FILTERS.SEARCH) ?? "",
            pageSize: pageSize.toString(),
            pageNo: (Number(searchParams.get(constants.FILTERS.PAGE_NO) ?? 2) - 1).toString()
        })
    }

    return (
        <NavLayout>
            <div className="max-w-screen-xl w-full mx-auto px-5 py-10 lg:py-12">
                <div className="mb-5">
                    <SectionLeftHeader title='😊 WELCOME TO OUR SHOP' subtitle='Your One-Stop Shopping Destination. Find What You Love, Love What You Find.' />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 mb-10">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Category</span>
                        </div>
                        <select
                            disabled={isLoading}
                            value={searchParams.get(constants.FILTERS.CATEGORY_ID) ?? ""}
                            className="select select-bordered"
                            onChange={e => setSearchParams({
                                seriesId: searchParams.get(constants.FILTERS.SERIES_ID) ?? "",
                                categoryId: e.target.value,
                                search: searchParams.get(constants.FILTERS.SEARCH) ?? "",
                            })}
                        >
                            <option selected value="">All</option>
                            {filterFieldData?.categoryList.map((e, i) => (
                                <option value={e.id} key={i}>{e.title}</option>
                            ))}
                        </select>
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Series</span>
                        </div>
                        <select
                            disabled={isLoading}
                            value={searchParams.get(constants.FILTERS.SERIES_ID) ?? ""}
                            onChange={e => setSearchParams({
                                seriesId: e.target.value,
                                categoryId: searchParams.get(constants.FILTERS.CATEGORY_ID) ?? "",
                                search: searchParams.get(constants.FILTERS.SEARCH) ?? "",
                            })}
                            className="select select-bordered"
                        >
                            <option selected value="">All</option>
                            {filterFieldData?.seriesList.map((e, i) => (
                                <option value={e.id} key={i}>{e.title}</option>
                            ))}
                        </select>
                    </label>
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
                                        seriesId: searchParams.get(constants.FILTERS.SERIES_ID) ?? "",
                                        categoryId: searchParams.get(constants.FILTERS.CATEGORY_ID) ?? "",
                                        search: searchText,
                                    });
                                }
                            }}
                            className="input input-bordered"
                        />
                    </label>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
                    {productRes?.items?.map((data, i) => (
                        <ProductCard data={data} key={i} />
                    ))}
                </div>
                <div className="flex flex-col md:flex-row w-full gap-5 md:items-center md:justify-between mt-10">
                    <div className="opacity-50">
                        Total {productRes?.totalItems ?? 0} products found . Showing page {productRes?.pageNo ?? 1} of {productRes?.totalPages ?? 1}
                    </div>
                    <div className="join grid grid-cols-2">
                        <button className="join-item btn btn-outline" disabled={!productRes?.hasPrev} onClick={handlePrev}>Previous page</button>
                        <button className="join-item btn btn-outline" disabled={!productRes?.hasNext} onClick={handleNext}>Next Page</button>
                    </div>
                </div>
            </div>
        </NavLayout>
    )
}

export default ProductList