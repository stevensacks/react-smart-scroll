import React, {useLayoutEffect, useRef, useState} from 'react';
import useComponentRect from '../../hooks/useComponentRect';

const ReactSmartScrollRow = props => {
    const {Component, data, onUpdate, rowHeight, rowIndex, rowProps} = props;
    const [height, setHeight] = useState(rowHeight);

    const ref = useRef(null);
    const rect = useComponentRect(ref);

    useLayoutEffect(() => {
        if (rect.height && rect.height !== height) {
            setHeight(rect.height);
        }
    }, [height, rect, ref]);

    useLayoutEffect(() => {
        onUpdate({rowIndex, height});
    }, [height, onUpdate, rowIndex]);

    return (
        <Component
            data={data}
            height={height}
            rowIndex={rowIndex}
            rowRef={ref}
            {...rowProps}
        />
    );
};

export default React.memo(ReactSmartScrollRow);
