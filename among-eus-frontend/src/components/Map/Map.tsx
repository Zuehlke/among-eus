import React, {Component, useEffect, useRef, useState} from "react";
import {Wrapper} from "@googlemaps/react-wrapper";
import './Map.css';

export default class Map extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
        }
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ lat: position.coords.latitude, lng: position.coords.longitude});
            },
            error => console.log(error)
        );
    }

    render() {
        const zoom = 20;

        return (
            <Wrapper apiKey="AIzaSyC3PzqgCWeT_lrobprlTEz1SmVQ443n2Mg">
                <MyMapComponent center={{ lat: this.state.lat, lng: this.state.lng }} zoom={zoom} />
            </Wrapper>
        );
    }
}

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