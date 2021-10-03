import {FC, RefObject} from 'react';

export type ReactSmartScrollRow = FC<{
    data: any;
    height: number;
    rowIndex: number;
    rowRef: RefObject<any>;
} & Record<string, any>>;
