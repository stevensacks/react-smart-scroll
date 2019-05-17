import {useLayoutEffect, useState} from 'react';

export default ref => {
    const [scroll, setScroll] = useState({});
    useLayoutEffect(() => {
        const {current} = ref;
        const onScroll = () => {
            setScroll({
                top: current.scrollTop,
                left: current.scrollLeft,
            });
        };
        if (current) {
            current.addEventListener('scroll', onScroll);
        }
        return () => current && current.removeEventListener('scroll', onScroll);
    }, [ref]);
    return scroll;
};
