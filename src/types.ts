import {RefObject} from 'react';

export type RowComponentProps = {
    data: any;
    height: number;
    rowIndex: number;
    rowRef: RefObject<any>;
} & Record<string, any>;

export type UpdateAction =
    | {type: 'reset'}
    | {type: 'update'; payload: {height: number; rowIndex: number}};
