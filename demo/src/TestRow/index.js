import React from 'react';

const TestRow = ({data, height, onClick, rowIndex, rowRef}) => (
    <div ref={rowRef} className="test-row" onClick={() => onClick(rowIndex)}>
        <strong>[{data.id}]</strong>: {height}px
        <br />
        {data.content}
    </div>
);

export default TestRow;
