import {useLayoutEffect} from 'react';

export default (data, ref) => {
    useLayoutEffect(() => {
        if (ref.current) ref.current.scrollTo(0, 0);
    }, [data, ref]);
};
