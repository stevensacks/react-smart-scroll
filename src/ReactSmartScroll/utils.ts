// these utils are imperative because they are called in useLayoutEffect
// and performance is the priority
export const calcStartIndex = (actualHeights: number[], top = 0) => {
    const len = actualHeights.length;
    if (top === 0 || len < 2) return 0;
    let totalHeight = actualHeights[0];
    for (let i = 1; i < len; i++) {
        totalHeight += actualHeights[i];
        if (top <= totalHeight) {
            return i - 1;
        }
    }
    return 0;
};

export const calcEndIndex = (
    actualHeights: number[],
    visibleHeight: number,
    startIndex: number
) => {
    const len = actualHeights.length;
    if (len < 2) return len;
    let totalHeight = -actualHeights[startIndex];
    for (let i = startIndex; i < len - 1; i++) {
        totalHeight += actualHeights[i];
        if (totalHeight > visibleHeight + actualHeights[i + 1]) {
            return i;
        }
    }
    return len - 1;
};

export const sumRange = (array: number[], start: number, end: number) => {
    let result = 0;
    const e = end + 1;
    for (let i = start; i < e; i++) {
        result += array[i] || 0;
    }
    return result;
};
