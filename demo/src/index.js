import data from './data';
import React, {useState} from 'react';
import ReactSmartScroll from '../../src';
import {render} from 'react-dom';
import TestRow from './TestRow';
import './index.css';

const Demo = () => {
    const [clicked, setClicked] = useState('Click on a row');
    const onClick = index => setClicked(`Clicked on row ${index}`);
    return (
        <div>
            <h1>React Smart Scroll Demo</h1>
            <div className="click-status">{clicked}</div>
            <ReactSmartScroll className="demo-smart-scroll" data={data} onClick={onClick} row={TestRow}/>
        </div>
    );
};

render(<Demo/>, document.querySelector('#demo'));
