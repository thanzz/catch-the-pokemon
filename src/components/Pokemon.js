
import { useEffect, useState } from "react";

export default function Pokemon({ data, handlePokemonClick, parentRef }) {
    const [position, setPosition] = useState({ height: 0, width: 0 });
    useEffect(() => {
        if (parentRef.current) {
            const { clientWidth, clientHeight } = parentRef.current;
            setPosition({ height: clientHeight, width: clientWidth })
        }
    }, []);

    return (
        <>
            <img src={data.image}
                alt="Pokemon"
                className={`pokemon`}
                style={{ top: `${Math.floor(Math.random() * (position.height - 100))}px`, left: `${Math.floor(Math.random() * (position.width - 100))}px` }}
                onClick={() => handlePokemonClick(data)} />
        </>

    )
}
