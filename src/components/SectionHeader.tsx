import classNames from "classnames"

const SectionHeader = ({
    left,
    disableSubTitle
}: {
    left?: boolean,
    disableSubTitle?: boolean
}) => {
    return (
        <>
            <div className={classNames({
                "text-3xl font-bold tracking-wide text-left": true,
                "lg:text-center": !left,
                "mb-3": !disableSubTitle,
                "mb-8": disableSubTitle
            })}>
                FEATURED PRODUCTS
            </div>
            {!disableSubTitle && (
                <div className={classNames({
                    "text-left text-base-content opacity-80 mb-8 text-lg": true,
                    "lg:text-center": !left
                })}>
                    Visit our most popular categories which is mind-blowing
                </div>
            )}
        </>
    )
}

export default SectionHeader