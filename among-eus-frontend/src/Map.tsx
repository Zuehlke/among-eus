import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import './Map.css';

const render = (status: Status) => {
    return <h1>{status}</h1>;
};


function MyMapComponent({center, zoom}: {
    center: google.maps.LatLngLiteral;
    zoom: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {center, zoom}));
        }
    }, [ref, map]);

    return <div ref={ref} id="map" />;
}

export default function Map() {
    const center = { lat: 47.04423359340005, lng: 8.465418735471747 };
    const zoom = 20;

    return (
        <Wrapper apiKey="" render={render}>
            <MyMapComponent center={center} zoom={zoom} />
        </Wrapper>
    );
}