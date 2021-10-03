import React, {memo, RefObject, useLayoutEffect, useState} from 'react';
import useComponentHeight from '../hooks/useComponentHeight';
import {RowComponent} from '../../types';
import {UpdateAction} from '../utils';

interface Props {
    Component: RowComponent;
    data: any;
    onUpdate: (event: UpdateAction) => void;
    rowHeight: number;
    rowIndex: number;
    rowProps: any;
    rowRef: RefObject<HTMLElement>;
}

const ReactSmartScrollRow = (props: Props) => {
    const {Component, data, onUpdate, rowHeight, rowIndex, rowProps, rowRef} =
        props;

    const [height, setHeight] = useState(rowHeight);
    const measuredHeight = useComponentHeight(rowRef);

    useLayoutEffect(() => {
        if (measuredHeight && measuredHeight !== height) {
            setHeight(measuredHeight);
        }
    }, [height, measuredHeight]);

    useLayoutEffect(() => {
        onUpdate({type: 'update', payload: {height, rowIndex}});
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

export default memo(ReactSmartScrollRow);
