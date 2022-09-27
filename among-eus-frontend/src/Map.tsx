import React, {useEffect, useRef, useState} from "react";
import {Status, Wrapper} from "@googlemaps/react-wrapper";
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
            setMap(new window.google.maps.Map(ref.current,
                {
                    center,
                    zoom,
                    scrollwheel: false,
                    draggable: false,
                    fullscreenControl: false,
                    disableDefaultUI: true
                }));
        }
    }, [ref, map]);

    return <div ref={ref} id="map" />;
}

export default function Map() {
    const zoom = 20;
    const pos = {
        lat: 0,
        lng: 0
    }

    return (
        <Wrapper apiKey="AIzaSyC3PzqgCWeT_lrobprlTEz1SmVQ443n2Mg" render={render}>
            <MyMapComponent center={pos} zoom={zoom} />
            <Marker position={pos} />
        </Wrapper>
    );
}