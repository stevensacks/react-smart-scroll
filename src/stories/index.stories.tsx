import React, {useState} from 'react';
import {ReactSmartScroll} from '../ReactSmartScroll';
import {Story} from '@storybook/react';
import TestRow from './TestRow';
import {testData} from './testData';

export default {
    component: ReactSmartScroll,
    title: 'ReactSmartScroll',
    parameters: {controls: {hideNoControlsWarning: true}},
};

export const Default: Story = () => {
    const [clicked, setClicked] = useState('Click on a row');
    const onClick = (index: number) => {
        setClicked(`Clicked on row ${index}`);
    };
    return (
        <div>
            <h1>React Smart Scroll Demo</h1>
            <div className="click-status">{clicked}</div>
            <ReactSmartScroll
                className="demo-smart-scroll"
                data={testData}
                onClick={onClick}
                row={TestRow}
                startAt={0}
            />
        </div>
    );
};
