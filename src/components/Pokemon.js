
import { useState, useRef } from "react";

export default function Pokemon({ data, handlePokimonHunted }) {

    var div = document.getElementsByTagName('body')[0];
    var winWidth = div.innerWidth;
    var winHeight = div.innerHeight;

    // randomTop = getRandomNumber(0, winHeight);
    // randomLeft = getRandomNumber(0, winWidth);

    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    const imagePosition = useRef({
        position: 'absolute',
        top: getRandomNumber(0, winHeight),
        left: getRandomNumber(0, winWidth),
        // transform: 'translate(-50%, -50%)'
    });

    return (
        <>
            <img src={data.image}
                alt="Pokimon"
                className={`pokimon`}
                style={imagePosition}
                onClick={() => handlePokimonHunted(data)} />
        </>

    )
}
