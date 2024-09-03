import { useEffect, useState, useRef } from 'react';

function useOnScreen(ref) {
    const [isIntersecting, setIntersecting] = useState(false);

    const observer = useRef(
        new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting))
    );

    useEffect(() => {
        observer.current.observe(ref.current);
        return () => {
            observer.current.disconnect();
        };
    }, []);

    return isIntersecting;
}

export default useOnScreen;
