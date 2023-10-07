import { useState, useEffect } from "react";

export default function useDimensions(){
    const [dimensions, setDimensions] = useState({width:window.innerWidth,height:window.innerHeight});

    useEffect(()=>{
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setDimensions({width:width,height:height});
        }
        window.addEventListener('resize',handleResize);
        return () => window.removeEventListener('resize',handleResize);
    },[])

    return dimensions;
}