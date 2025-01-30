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
                "text-2xl font-extrabold title text-left": true,
            })}>
                {title}
            </div>
            {subtitle && (
                <div className="text-left text-base-content opacity-80">
                    {subtitle}
                </div>
            )}
        </>
    )
}

export default SectionLeftHeader