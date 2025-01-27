import classNames from "classnames"

const SectionLeftHeader = ({
    title,
    subtitle
}: {
    title: string,
    subtitle?: string
}) => {
    return (
        <>
            <div className={classNames({
                "text-3xl font-bold tracking-wide text-left": true,
                "mb-3": subtitle,
                "mb-8": !subtitle
            })}>
                {title}
            </div>
            {subtitle && (
                <div className="text-left text-base-content opacity-80 mb-8 text-lg">
                    {subtitle}
                </div>
            )}
        </>
    )
}

export default SectionLeftHeader