// // https://dev.to/chilupa/usebreakpoint-react-hook-13oa
// import {useEffect, useState} from 'react';
//
// // For adjusting tailwind default breakpoints settings
// const breakpoints = {
//     640: 1, // sm
//     768: 2, // md
//     1024: 3, // lg
//     1280: 4, // xl
// };
//
// const useBreakpoint = () => {
//     const [breakpoint, setBreakPoint] = useState(null);
//     const [windowSize, setWindowSize] = useState({
//         width: undefined,
//         height: undefined,
//     });
//
//     const handleResize = () => {
//         setWindowSize({
//             width: window.innerWidth,
//             height: window.innerHeight,
//         });
//     };
//
//     useEffect(() => {
//         window.addEventListener('resize', handleResize);
//         handleResize();
//
//         if (windowSize.width <= 640) {
//             setBreakPoint(breakpoints[640]);
//         } else if (640 < windowSize.width <= 768) {
//             setBreakPoint(breakpoints[768]);
//         } else if (768 < windowSize.width <= 1024) {
//             setBreakPoint(breakpoints[1024]);
//         } else if (windowSize.width > 1024) {
//             setBreakPoint(breakpoints[1280]);
//         }
//
//         return () => window.removeEventListener('resize', handleResize);
//     }, [windowSize.width]);
//     return breakpoint;
// };
//
// export default useBreakpoint;
//

import {useEffect, useState} from 'react';

// For adjusting tailwind default breakpoints settings
const breakpoints = {
    640: 1, // sm
    768: 2, // md
    1024: 3, // lg
    1280: 4, // xl
};

const useBreakpoint = () => {
    const [breakpoint, setBreakPoint] = useState(null);

    const handleResize = () => {
        const width = window.innerWidth;

        if (width <= 640) {
            setBreakPoint(breakpoints[640]);
        } else if (width > 640 && width <= 768) {
            setBreakPoint(breakpoints[768]);
        } else if (width > 768 && width <= 1024) {
            setBreakPoint(breakpoints[1024]);
        } else if (width > 1024) {
            setBreakPoint(breakpoints[1280]);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        // Call handleResize initially to set the breakpoint based on the initial window size
        handleResize();

        // Cleanup function to remove the event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Removed the dependency on windowSize.width

    return breakpoint;
};

export default useBreakpoint;
