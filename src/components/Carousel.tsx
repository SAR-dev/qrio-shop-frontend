import classNames from 'classnames';
import {
    Children,
    cloneElement,
    createRef,
    forwardRef,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


export interface CarouselHandle {
    goToIndex: (index: number) => void;
    next: () => void;
    prev: () => void;
    getActiveIndex: () => number;
}

interface CarouselProps {
    children: ReactNode;
    smallButton?: boolean;
    autoScroll?: boolean;
    autoScrollInterval?: number; 
}

const Carousel = forwardRef<CarouselHandle, CarouselProps>(
    (
        {
            children,
            smallButton,
            autoScroll = false,
            autoScrollInterval = 3000,
        },
        ref
    ) => {
        const itemsCount = Children.count(children);

        const itemRefs = useRef(
            Array(itemsCount)
                .fill(null)
                .map(() => createRef<HTMLDivElement>())
        );

        const [activeIndex, setActiveIndex] = useState(0);

        const scrollToIndex = (index: number) => {
            if (index < 0 || index >= itemsCount) return;

            const container = itemRefs.current[0]?.current?.parentElement;
            const item = itemRefs.current[index]?.current;

            if (!container || !item) return;

            container.scrollTo({
                left: item.offsetLeft - container.offsetLeft,
                behavior: 'smooth',
            });

            setActiveIndex(index);
        };

        const goNext = () => {
            scrollToIndex((activeIndex + 1) % itemsCount);
        };

        const goPrev = () => {
            scrollToIndex(
                activeIndex === 0 ? itemsCount - 1 : activeIndex - 1
            );
        };

        useImperativeHandle(ref, () => ({
            goToIndex: scrollToIndex,
            next: goNext,
            prev: goPrev,
            getActiveIndex: () => activeIndex,
        }));

        useEffect(() => {
            if (!autoScroll || itemsCount <= 1) return;

            const timer = setInterval(goNext, autoScrollInterval);
            return () => clearInterval(timer);
        }, [activeIndex, autoScroll, autoScrollInterval, itemsCount]);


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

                {/* Next */}
                <div className="absolute top-0 right-0 h-full flex items-center">
                    <button
                        className={classNames(
                            'btn btn-square opacity-0 group-hover:opacity-100 duration-100 rounded-full m-2 z-[1]',
                            { 'btn-sm': smallButton }
                        )}
                        onClick={goNext}
                    >
                        <FaChevronRight className="size-5" />
                    </button>
                </div>

                {/* Prev */}
                <div className="absolute top-0 left-0 h-full flex items-center">
                    <button
                        className={classNames(
                            'btn btn-square opacity-0 group-hover:opacity-100 duration-100 rounded-full m-2 z-[1]',
                            { 'btn-sm': smallButton }
                        )}
                        onClick={goPrev}
                    >
                        <FaChevronLeft className="size-5" />
                    </button>
                </div>
            </div>
        );
    }
);

export default Carousel;
