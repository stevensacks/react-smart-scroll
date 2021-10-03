import {FC, RefObject} from 'react';

type RowComponentProps = {
    data: any;
    height: number;
    rowIndex: number;
    rowRef: RefObject<any>;
} & Record<string, any>;

export type RowComponent = FC<RowComponentProps>;
