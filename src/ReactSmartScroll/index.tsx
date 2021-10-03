import {calcEndIndex, calcStartIndex, sumRange} from './utils';
import React, {
    createRef,
    FC,
    memo,
    RefObject,
    useEffect,
    useLayoutEffect,
    useReducer,
    useRef,
    useState,
} from 'react';
import ReactSmartScrollRow from './ReactSmartScrollRow';
import useComponentHeight from './hooks/useComponentHeight';
import useScrollTop from './hooks/useScrollTop';
import {RowComponentProps, UpdateAction} from '../types';

type Props = {
    className?: string;
    data?: any[];
    overflow?: 'auto' | 'scroll';
    row?: FC<RowComponentProps>;
    rowHeight?: number;
    startAt?: number;
    style?: Record<string, any>;
} & Record<string, any>;

export const ReactSmartScroll = (props: Props) => {
    const {
        className,
        data = [],
        overflow = 'auto',
        row = () => null,
        rowHeight = 100,
        startAt = 0,
        style,
        ...rowProps
    } = props;

    const {length} = data;

    const [start, setStart] = useState(0);
    const [refs, setRefs] = useState<RefObject<HTMLElement>[]>([]);

    const [actualHeights, setActualHeights] = useReducer(
        (state: number[], action: UpdateAction) => {
            if (action.type === 'update') {
                const next = [...state];
                next[action.payload.rowIndex] = action.payload.height;
                return next;
            }
            return Array(data.length).fill(rowHeight);
        },
        []
    );

    useEffect(() => {
        setRefs(Array.from({length}).map(() => createRef()));
    }, [length]);

    useEffect(() => {
        setActualHeights({type: 'reset'});
    }, [length, rowHeight]);

    const [measurements, setMeasurements] = useState({
        startIndex: 0,
        endIndex: 0,
        paddingBottom: 0,
        paddingTop: 0,
    });

    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollTop = useScrollTop(scrollRef);
    const visibleHeight = useComponentHeight(scrollRef);

    // useEffect with this has considerable redraw lag
    useLayoutEffect(() => {
        if (scrollRef.current && visibleHeight) {
            const startIndex =
                start !== startAt
                    ? startAt
                    : calcStartIndex(actualHeights, scrollTop);

            const endIndex = calcEndIndex(
                actualHeights,
                visibleHeight,
                startIndex
            );

            const last = actualHeights.length - 1;

            const paddingTop =
                startIndex > 0 ? sumRange(actualHeights, 0, startIndex - 1) : 0;
            const paddingBottom =
                endIndex !== last
                    ? sumRange(actualHeights, endIndex + 1, last) + 17
                    : 0;

            /*const contentHeight = sumRange(
                actualHeights,
                0,
                actualHeights.length
            );*/

            setMeasurements({
                startIndex,
                endIndex,
                paddingBottom,
                paddingTop,
            });

            if (start !== startAt) {
                scrollRef.current.scrollTop = paddingTop;
                setTimeout(() => {
                    setStart(startAt);
                    if (data[startAt]) {
                        const el = refs[startAt].current;
                        if (el) el.scrollIntoView();
                    }
                });
            }
        }
    }, [actualHeights, data, refs, scrollTop, start, startAt, visibleHeight]);

    const {endIndex, paddingBottom, paddingTop, startIndex} = measurements;

    return (
        <div
            ref={scrollRef}
            className={className || ''}
            style={{overflow, ...style}}
        >
            <div style={{paddingBottom, paddingTop}}>
                {data.slice(startIndex, endIndex + 1).map((item, i) => (
                    <ReactSmartScrollRow
                        key={item.id || startIndex + i}
                        Component={row}
                        data={item}
                        onUpdate={setActualHeights}
                        rowHeight={actualHeights[startIndex + i]}
                        rowIndex={startIndex + i}
                        rowProps={rowProps}
                        rowRef={refs[startIndex + i]}
                    />
                ))}
            </div>
        </div>
    );
};

export default memo(ReactSmartScroll);
