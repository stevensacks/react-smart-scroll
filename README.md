# react-smart-scroll

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]

If you're looking for a lightweight, high-performance, easy-to-use way to render long lists efficiently in React, you found it.

"Smart Scrolling" only renders the visible rows, with some buffer rows above and below. It supports dynamic height rows.

react-smart-scroll is way more efficient and way easier to use than react-window or react-virtualized.

It is un-opinionated, and gives exactly you what you need with minimum configuration. Namely, fast rendering of long lists, and automatic support for variable height rows, even if they change height at runtime due to resizing, etc.

**This component uses React Hooks, so you'll need to be running React 16.8.x or above.**

## How To Use
You can check the `demo` folder for some example code, but here's how it works.

#### Props
There are no required props. If you pass nothing, you'll get nothing.

- `className` - A css className that will be applied to the component.
- `data` - An array of items - each item will be passed to your row component. See below.
- `row` - Your row component function/class.
- `rowHeight` - Starting row height (100 by default) - it starts with this as an estimate and adjusts to what the real height of each row is as you scroll.
- `style` - A style object applied to the component if you prefer this to a className. 
- `...rowProps` - Any additional props you pass will be applied to your row components, for example `onClick`.

```javascript
import ReactSmartScroll from 'react-smart-scroll';

<ReactSmartScroll 
    className="demo-smart-scroll" 
    data={data} 
    row={TestRow}
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

The `data` array can be made up of whatever you want. ReactSmartScroll does not care. It simply passes the data directly to your row component as-is.

If you pass an object with an `id` property, it will use the id as the key for each row, which can be more efficient than using the row index. But you don't have to.

Your row component receives the following props:
- `data` - The item in the data array that corresponds to this row.
- `height` - The current measured height of this row. It's provided mainly for debugging, but if you have a use for it, go for it.
- `rowIndex` - The index of the item in the data array. Same as height - provided for debugging, use if you like.
- `rowRef` - NECESSARY! You need to include `ref={rowRef}` prop on your row component's container element, whatever that is. This is how it computes the height of each row. Even if your rows are all the same height, you need to include this in your row component. It makes the rendering more efficient.
- `...rowProps` - Any additional props you passed to the ReactSmartScroll component will be available on every row by the same name. Just don't overwrite the 4 passed props. Or do and watch things break. Or not. I haven't tried it myself.

## Important!
This component does not have any default styling. You need to provide at least two properties in the css class or the style object. I didn't want to assume anything and wanted to give complete flexibility in how to implement it.

1. `height` - You need to provide a height or it won't work. `height: 100%`  may not be predictable. Favor `calc()`.  
2. `overflow-y` You must include `auto` or `scroll`.

I recommend rendering your list and figuring out what the average row height will be and setting rowHeight to that.

## How It Works
It's simple, really. And that's why it's so fast. And it's why I think other solutions are way over-engineered... but I digress.

It renders enough rows to fill the visible space of the scroll area. It measures the height of each of the visible row and caches it as you scroll (or resize) so that the next render of the same row is more efficient.

It always makes sure to include enough buffer above and below to never have an empty space while you scroll up and down.

It accomplishes simulating the total height of all the items by padding the top and bottom of the div that contains the rows. That's it! I told you it was simple. This is also why you have to set the height to a specific value and not a percentage. Percentage heights don't get along with css padding. It's not a bug, it's a feature.

There's no wrapper divs for your rows, absolute positioning, or polyfills for element observables. It's literally just two divs wrapped around your row components. I just did the hard part of figuring out the math for calculating the height.

And yes, if you look at the source, you'll see I'm using for loops for the top and bottom padding calculations. That's because they're an order of magnitude faster than map/reduce and since they're being called every time you scroll or resize, they needed to be high performance, especially if you have a really long list.

If you know how to speed up the calculations and make them faster way, please let me know.

Finally, if you're wondering why I have to add 17 pixels to the bottom padding, you're not alone. I have no idea why that's required for the calculations to be correct, but it is. The mysteries of CSS never end. If you know the answer, tweet it at me.
 
#### Disclaimer
The latest version of Firefox doesn't seem to honor React's rendering speed with `useLayoutEffect()` or `useEffect()`, so if you grab the scrollbar and scroll up and down really fast, you'll see blank space momentarily. Not sure why Firefox hates React, but it's not my bug. Chrome doesn't have this problem.

The good news is that using the mouse wheel to scroll looks good in all browsers.

### Future Stuff
I'm working on the ability to jump to a specific row in the list. This isn't as easy as you might think. It will probably be a prop called `startIndex` or something. I haven't decided that, yet.

If you have any feature ideas, be sure to let me know in the github issues. As long as it doesn't bloat the code, I'll consider it.
  
I hope you enjoy using this component as much as I enjoyed making it!

Follow me:
- twitter: https://twitter.com/stevensacks
- github: https://github.com/stevensacks
- gitlab: https://gitlab.com/stevensacks
- linkedin: https://www.linkedin.com/in/stevensacks


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
