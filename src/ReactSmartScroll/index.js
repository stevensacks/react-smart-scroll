import {calcEndIndex, calcStartIndex, sumRange} from './utils';
import React, {
    createRef,
    useEffect,
    useLayoutEffect,
    useReducer,
    useRef,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import ReactSmartScrollRow from './ReactSmartScrollRow';
import useComponentRect from '../hooks/useComponentRect';
import useScroll from '../hooks/useScroll';
import useScrollToTop from '../hooks/useScrollToTop';

const ReactSmartScroll = props => {
    const {
        className,
        data,
        overflow,
        row,
        rowHeight,
        startAt,
        style,
        ...rowProps
    } = props;

    const [start, setStart] = useState(0);
    const [refs, setRefs] = useState([]);

    const [actualHeights, setActualHeights] = useReducer((state, action) => {
        if (!action.reset) {
            const next = [...state];
            next[action.rowIndex] = action.height;
            return next;
        }
        return Array(data.length).fill(rowHeight);
    }, []);

    useEffect(() => {
        setRefs(
            Array(data.length)
                .fill(undefined)
                .map(() => createRef())
        );
    }, [data.length]);

    useEffect(() => {
        setActualHeights({reset: true});
    }, [data.length, rowHeight]);

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
            const startIndex =
                start !== startAt
                    ? startAt
                    : calcStartIndex(actualHeights, scroll.top);
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
            if (start !== startAt) {
                scrollRef.current.scrollTop = paddingTop;
                setTimeout(() => {
                    setStart(startAt);
                    if (data[startAt]) {
                        const el = refs[startAt].current;
                        if (el) el.scrollIntoView();
                    }
                }, 0);
            }
        }
    }, [actualHeights, data, refs, scroll.top, start, startAt, visible.height]);

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

ReactSmartScroll.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array,
    overflow: PropTypes.string,
    row: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    rowHeight: PropTypes.number,
    startAt: PropTypes.number,
    style: PropTypes.object,
};

ReactSmartScroll.defaultProps = {
    className: '',
    data: [],
    overflow: 'auto',
    row: () => null,
    rowHeight: 100,
    startAt: 0,
    style: {},
};

export default React.memo(ReactSmartScroll);
