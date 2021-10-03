import React, {memo, RefObject, useLayoutEffect, useState} from 'react';
import {ReactSmartScrollRow} from '../../types';
import useComponentHeight from '../hooks/useComponentHeight';
import {UpdateAction} from '../utils';

interface Props {
    Component: ReactSmartScrollRow;
    data: any;
    onUpdate: (event: UpdateAction) => void;
    rowHeight: number;
    rowIndex: number;
    rowProps: any;
    rowRef: RefObject<HTMLElement>;
}

const SmartScrollRow = (props: Props) => {
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

export default memo(SmartScrollRow);
