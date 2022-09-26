import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import './Map.css';

const render = (status: Status) => {
    return <h1>{status}</h1>;
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>();

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    return null;
};


function MyMapComponent({center, zoom}: {
    center: google.maps.LatLngLiteral;
    zoom: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {center, zoom, scrollwheel: false, draggable: false, fullscreenControl: false}));
        }
    }, [ref, map]);

    return <div ref={ref} id="map" />;
}

export default function Map() {
    const center = { lat: 47.04423359340005, lng: 8.465418735471747 };
    const zoom = 20;
    const position = { lat: 47.04423359340005, lng: 8.465418735471747 };
    return (
        <Wrapper apiKey="" render={render}>
            <MyMapComponent center={center} zoom={zoom} />
            <Marker position={position} />
        </Wrapper>
    );
}