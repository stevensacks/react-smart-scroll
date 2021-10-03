import {RefObject, useLayoutEffect, useState} from 'react';

const useScrollTop = (ref: RefObject<HTMLDivElement>): number => {
    const [scroll, setScroll] = useState(0);

    useLayoutEffect(() => {
        const {current} = ref;
        if (current) {
            const onScroll = () => {
                setScroll(current.scrollTop);
            };
            current.addEventListener('scroll', onScroll);
            return () => current.removeEventListener('scroll', onScroll);
        }
    }, [ref]);

    return scroll;
};

export default useScrollTop;
