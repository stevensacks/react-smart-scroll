import {RefObject, useEffect, useState} from 'react';

const useComponentHeight = (ref: RefObject<HTMLElement>): number => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref) {
            const {current} = ref;
            if (current) {
                const onResize = () => {
                    setHeight(current.getBoundingClientRect().height);
                };
                window.addEventListener('resize', onResize);
                setHeight(current.getBoundingClientRect().height);
                return () => window.removeEventListener('resize', onResize);
            }
        }
    }, [ref]);

    return height;
};

export default useComponentHeight;
