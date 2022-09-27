import React, {Children, cloneElement, FC, isValidElement, useEffect, useRef, useState} from "react";

interface PlayerMapProps extends google.maps.MapOptions {
    children?: React.ReactNode;
}

const PlayerMap: FC<PlayerMapProps> = ({
                                           children,
                                           ...options
                                       }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    if (map) {
        map.setOptions({
            ...options,
            fullscreenControl: false,
            disableDefaultUI: true,
            mapTypeId: 'satellite', // terrain / satellite / roadmap
            // Disable points of interest
            styles: [{
                featureType: "poi",
                elementType: "labels",
                stylers: [
                    {visibility: "off"}
                ]
            }],
        });
    }

    return (
        <>
            <div ref={ref} style={{width: "100%", height: "500px"}}/>
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    // set the map prop on the child component
                    // @ts-ignore
                    return cloneElement(child, {map});
                }
            })}
        </>
    );
};

export default PlayerMap;