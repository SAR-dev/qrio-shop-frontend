const BlogCard = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-5 group">
            <img
                className="h-64 w-full lg:w-96 object-cover"
                src="https://cdn.animenewsnetwork.com/thumbnails/crop900x350gH0/cms/review/219692/kamierabis2.jpg"
                alt=""
            />
            <div className="flex flex-col gap-5 px-5 lg:px-0 py-5">
                <div className="text-primary leading-4 uppercase title font-bold">Review</div>
                <div className="text-xl font-extrabold uppercase title">Tying the Knot With an Amagami Sister</div>
                <div className="">
                Uryu is surprised to encounter the shrine's three sisters, all shrine maidens with the Amagami name, Yae, Yuna and Asahi. A series of embarrassing misunderstandings make Uryu very uncomfortable.
                </div>
                <button className="text-sm font-semibold text-success w-fit">
                    Continue Reading
                </button>
            </div>
        </div>
    )
}

export default BlogCard