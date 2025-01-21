import classNames from "classnames"

const SectionHeader = ({ left }: { left?: boolean }) => {
    return (
        <>
            <div className={classNames({
                "text-3xl font-bold tracking-wide text-left mb-3": left,
                "lg:text-center": !left
            })}>
                FEATURED PRODUCTS
            </div>
            <div className={classNames({
                "text-left text-base-content opacity-80 mb-8 text-lg": left,
                "lg:text-center": !left
            })}>
                Visit our most popular categories which is mind-blowing
            </div>
        </>
    )
}

export default SectionHeader