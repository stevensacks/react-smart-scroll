import {useEffect, useState} from 'react';

export default ref => {
    const [rect, setRect] = useState({});
    useEffect(() => {
        if (ref) {
            const {current} = ref;
            const onResize = () => {
                setRect(current.getBoundingClientRect());
            };
            if (current) {
                window.addEventListener('resize', onResize);
                setRect(current.getBoundingClientRect());
            }
            return () => window.removeEventListener('resize', onResize);
        }
    }, [ref]);
    return rect;
};
