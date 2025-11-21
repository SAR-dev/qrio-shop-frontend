import classNames from 'classnames';
import { Children, cloneElement, createRef, useEffect, useRef, useState, ReactNode } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CarouselProps {
    children: ReactNode;
    smallButton?: boolean;
    autoScroll?: boolean;
    autoScrollInterval?: number; // default 3000 ms
}

const Carousel = ({
    children,
    smallButton,
    autoScroll = false,
    autoScrollInterval = 3000
}: CarouselProps) => {
    const itemsCount = Children.count(children);
    const itemRefs = useRef(
        Array(itemsCount)
            .fill(null)
            .map(() => createRef<HTMLDivElement>())
    );
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollToIndex = (index: number) => {
        itemRefs.current[index]?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
        setActiveIndex(index);
    };

    const goNext = () => {
        if (activeIndex < itemsCount - 1) {
            scrollToIndex(activeIndex + 1);
        } else {
            scrollToIndex(0);
        }
    };

    const goPrev = () => {
        if (activeIndex > 0) {
            scrollToIndex(activeIndex - 1);
        } else {
            scrollToIndex(itemsCount - 1);
        }
    };

    // 🔥 Auto-scroll effect
    useEffect(() => {
        if (!autoScroll) return;

        const timer = setInterval(() => {
            goNext();
        }, autoScrollInterval);

        return () => clearInterval(timer);
    }, [activeIndex, autoScroll, autoScrollInterval]);

    return (
        <div className="relative group h-full">
            <div className="carousel w-full h-full flex overflow-x-auto no-scrollbar">
                {Children.map(children, (child, i) => {
                    if (!child || typeof child !== 'object') return null;
                    return cloneElement(child as React.ReactElement, {
                        ref: itemRefs.current[i],
                    });
                })}
            </div>

            {/* Next Button */}
            <div className="absolute top-0 right-0 h-full flex items-center">
                <button
                    className={classNames(
                        'btn btn-square opacity-0 group-hover:opacity-100 duration-100 rounded-full m-2 z-[1]',
                        { 'btn-sm': smallButton }
                    )}
                    onClick={goNext}
                    disabled={activeIndex >= itemsCount - 1}
                >
                    <FaChevronRight className="size-5" />
                </button>
            </div>

            {/* Prev Button */}
            <div className="absolute top-0 left-0 h-full flex items-center">
                <button
                    className={classNames(
                        'btn btn-square opacity-0 group-hover:opacity-100 duration-100 rounded-full m-2 z-[1]',
                        { 'btn-sm': smallButton }
                    )}
                    onClick={goPrev}
                    disabled={activeIndex <= 0}
                >
                    <FaChevronLeft className="size-5" />
                </button>
            </div>
        </div>
    );
};

export default Carousel;
