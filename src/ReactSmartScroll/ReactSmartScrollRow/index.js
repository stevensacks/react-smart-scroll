import React, {useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useComponentRect from '../../hooks/useComponentRect';

const ReactSmartScrollRow = props => {
    const {
        Component,
        data,
        onUpdate,
        rowHeight,
        rowIndex,
        rowProps,
        rowRef,
    } = props;
    const [height, setHeight] = useState(rowHeight);

    const rect = useComponentRect(rowRef);

    useLayoutEffect(() => {
        if (rect.height && rect.height !== height) {
            setHeight(rect.height);
        }
    }, [height, rect, rowRef]);

    useLayoutEffect(() => {
        onUpdate({rowIndex, height});
    }, [height, onUpdate, rowIndex]);

    return (
        <Component
            data={data}
            height={height}
            rowIndex={rowIndex}
            rowRef={rowRef}
            {...rowProps}
        />
    );
};

ReactSmartScrollRow.propTypes = {
    Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    data: PropTypes.object,
    onUpdate: PropTypes.func,
    rowHeight: PropTypes.number,
    rowIndex: PropTypes.number,
    rowProps: PropTypes.object,
    rowRef: PropTypes.object,
};

export default React.memo(ReactSmartScrollRow);
