# react-smart-scroll

[![npm version](https://badge.fury.io/js/react-smart-scroll.svg)](//npmjs.com/package/react-smart-scroll)

ReactSmartScroll is a lightweight, high-performance, easy-to-use way to render long lists efficiently in React. It only renders the visible rows, with a few buffer rows above and below.

ReactSmartScroll is (mostly) un-opinionated, with minimum configuration. It has automatic support for variable height rows, even if they change height at runtime due to resizing, expanding, etc.

### Installation
```
yarn add react-smart-scroll

npm i -S react-smart-scroll
```

### Super Simple Sample:
```javascript
import ReactSmartScroll from 'react-smart-scroll';

const data = [
    {id: 1, text: 'Hello'},
    {id: 2, text: 'World'},
];

const TestRow = ({data, rowRef}) => (
    <div ref={rowRef}>
        {data.text}
    </div>
);

export default () => (
    <ReactSmartScroll data={data} row={TestRow} />
);
```

### Working Demo with variable height rows:
https://codesandbox.io/s/react-smart-scroll-demo-3x1ym

**This component uses React Hooks, so it requires React 16.8.x or above.**

## How To Use
ReactSmartScroll is designed to be simple to use. You can check the `demo` folder for an example, as well.

At its most basic, you pass an array of data and a row component to render the items in the array.

All of the props are optional. If you don't provide any data or a row component, it won't render anything, but it won't cause any errors, either.

You need to apply `height`, either in the css class or the style object. You can use a specific height, or `calc()`.

Due to a CSS limitation with how overflow works with padding, `height: 100%` does not work.

The `overflow` default value of `auto` is applied via `style`. So, if you want to use a css class to control it, you need to pass `null`, `undefined`, or an empty string to `overflow`. If you use a style object, you can set it there, since the default `auto` is applied before your style object and thus can be overwritten that way.

#### Props
- `className` - A css className that will be applied to the component.
- `data` - An array of items to be passed to your row component.
- `overflow` - You can set this to `auto` or `scroll` ("auto" is the default).
- `row` - Your row component.
- `rowHeight` - Starting row height (100 by default) - it starts with this as an estimate for all rows, and then measures and caches the actual height of each row is as you scroll.
- `startAt` - You can pass an index to start the list at (0 by default).
- `style` - A style object applied to the component if you prefer using inline styling instead of css.
- `...rowProps` - Any additional props you pass will be applied to your row components, for example `onClick`.

```javascript
import ReactSmartScroll from 'react-smart-scroll';

<ReactSmartScroll 
    className="demo-smart-scroll" 
    data={data} 
    overflow="scroll"
    row={TestRow}
    startAt={5}
    onClick={() => console.log('Hello!')} // passed to row components
    label="My text is: " // passed to row components
/>

const TestRow = ({data, height, label, onClick, rowIndex, rowRef}) => (
    <div ref={rowRef} className="test-row" onClick={() => onClick(rowIndex)}>
        <strong>[{data.id}]</strong>: {height}px<br/>
        <label>{label}</label>:<p>{data.text}</p>
    </div>
);
```

The `data` array can be made up of objects or strings. ReactSmartScroll passes the items in the array directly to your row component so you have complete freedom in how the rows render. If you pass an object with an `id` property, it will use the `id` as the key for each row, which can be more efficient than using the row index.

Your row component receives the following props:
- `data` - The item in the data array that corresponds to this row.
- `height` - The current measured height of the row. It's provided for debugging or if you have a use for it.
- `rowIndex` - The index of the item in the data array. Also provided for debugging, use if you like.
- `rowRef` - *required* You need to include `ref={rowRef}` prop on your row component's container element.
- `...rowProps` - Any additional props you passed to the ReactSmartScroll component will be available on every row. 

## How It Works
ReactSmartScroll renders enough rows to fill the visible space of the scroll area, plus an extra one above and below. It measures the height of each of the visible row and caches that height as you scroll (or resize) so that the next render of the same row is more efficient. It simulates the total height of all the items by adjusting the padding top and bottom of the div that contains the rows as you scroll.

Unlike other virtual scrolling components/libraries out there, there are no unnecessary wrapper divs for your rows, it doesn't use absolute positioning, and doesn't require any polyfills.
 
#### Firefox Note
The latest version of Firefox doesn't seem to keep up with React's rendering speed with `useLayoutEffect()` or `useEffect()`, so if you grab the scrollbar and scroll up and down really fast, you'll see blank space momentarily. Other browsers don't appear to have this problem. Using the mouse wheel to scroll looks good in all browsers.

### rowRef Note
>Why does React Smart Scroll pass `rowRef` instead of just passing `ref`?

This removes the burden of having to wrap functional row components with `React.forwardRef()`. 

IMO, it's easier and more flexible for you to use `rowRef`.

## Closing Note
I hope you enjoy using this component as much as I enjoyed making it!

Follow me:
- twitter: https://twitter.com/stevensacks
- github: https://github.com/stevensacks
- gitlab: https://gitlab.com/stevensacks
- linkedin: https://www.linkedin.com/in/stevensacks

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
