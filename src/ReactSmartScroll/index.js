import {calcEndIndex, calcStartIndex} from './utils';
import React, {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    useReducer,
} from 'react';
import ReactSmartScrollRow from './ReactSmartScrollRow';
import {sumRange} from './utils';
import useComponentRect from '../hooks/useComponentRect';
import useScroll from '../hooks/useScroll';
import useScrollToTop from '../hooks/useScrollToTop';

const ReactSmartScroll = props => {
    const {className, data, row, rowHeight, style, ...rowProps} = props;

    const [actualHeights, setActualHeights] = useReducer((state, action) => {
        if (!action.reset) {
            const next = [...state];
            next[action.rowIndex] = action.height;
            return next;
        }
        return Array(data.length).fill(rowHeight);
    }, []);

    useEffect(() => {
        setActualHeights({reset: true});
    }, [data.length, rowHeight, setActualHeights]);

    const [measurements, setMeasurements] = useState({
        startIndex: 0,
        endIndex: 0,
        paddingBottom: 0,
        paddingTop: 0,
    });

    const scrollRef = useRef(undefined);
    const scroll = useScroll(scrollRef);
    const visible = useComponentRect(scrollRef);
    useScrollToTop(data, scrollRef);

    // useEffect with this has considerable redraw lag
    useLayoutEffect(() => {
        if (visible.height) {
            const startIndex = calcStartIndex(actualHeights, scroll.top);
            const endIndex = calcEndIndex(
                actualHeights,
                visible.height,
                startIndex
            );

            const last = actualHeights.length - 1;

            const paddingTop =
                startIndex > 0 ? sumRange(actualHeights, 0, startIndex - 1) : 0;
            const paddingBottom =
                endIndex !== last
                    ? sumRange(actualHeights, endIndex + 1, last) + 17
                    : 0;

            const contentHeight = sumRange(
                actualHeights,
                0,
                actualHeights.length
            );

            const measurements = {
                startIndex,
                endIndex,
                paddingBottom,
                paddingTop,
                contentHeight,
            };
            setMeasurements(measurements);
        }
    }, [actualHeights, scroll.top, setMeasurements, visible.height]);

    const {endIndex, paddingBottom, paddingTop, startIndex} = measurements;

    return (
        <div ref={scrollRef} className={className || ''} style={style}>
            <div style={{paddingBottom, paddingTop: paddingTop}}>
                {data.slice(startIndex, endIndex + 1).map((item, i) => (
                    <ReactSmartScrollRow
                        key={item.id || startIndex + i}
                        Component={row}
                        data={item}
                        onUpdate={setActualHeights}
                        rowProps={rowProps}
                        rowHeight={actualHeights[startIndex + i]}
                        rowIndex={startIndex + i}
                    />
                ))}
            </div>
        </div>
    );
};

ReactSmartScroll.defaultProps = {
    className: '',
    data: [],
    row: () => null,
    rowHeight: 100,
    style: {},
};

export default React.memo(ReactSmartScroll);
