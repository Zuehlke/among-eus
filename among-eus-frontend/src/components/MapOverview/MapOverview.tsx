import React, {FC, useState} from 'react';
import './MapOverview.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faUser} from '@fortawesome/free-solid-svg-icons'
import {sendMessage} from "../../utils/websocket-client";
import {Status, Wrapper} from '@googlemaps/react-wrapper';
import PlayerMap from "./PlayerMap/PlayerMap";
import Marker, {MarkerTypes} from "./Marker/Marker";

interface MapOverviewProps {
    userId: string | null;
    gameId: string | null;
}

const renderMapStatus = (status: Status) => {
    return <h1>{status}</h1>;
};

const MapOverview: FC<MapOverviewProps> = (props) => {
    const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral>({
        lat: 47,
        lng: 8,
    });

    if (props.gameId && props.userId) {
        startGpsTracking(props.gameId, props.userId, setCurrentLocation);
    }

    const otherPlayer = {
        lat: 47.0444195,
        lng: 8.466423,
    }

    return (
        <div>
            <h2 className="title">Among Eus - {props.gameId}</h2>
            <h3 className="sub-title">Welcome {props.userId}</h3>
            <div className="numberOfPlayer"><FontAwesomeIcon icon={faUser}/> 7 Players - <FontAwesomeIcon
                icon={faCheck}/> 5
                Tasks
            </div>
            <Wrapper apiKey="AIzaSyC3PzqgCWeT_lrobprlTEz1SmVQ443n2Mg" render={renderMapStatus}>
                <PlayerMap center={currentLocation} zoom={18}>
                    <Marker key={1} position={currentLocation} labelName={'Me'} labelType={MarkerTypes.PLAYER}></Marker>
                    <Marker key={2} position={otherPlayer} labelName={'Fabio'} labelType={MarkerTypes.OPPONENT}></Marker>
                </PlayerMap>
            </Wrapper>
            <div className="action-bar">
                <div className="action-bar-child">Daniel (7 Meter)</div>
                <div className="action-bar-child">
                    <button>umtue</button>
                </div>
            </div>
        </div>
    )
};

function startGpsTracking(game: string, user: string,
                          setCurrentLocation: (location: google.maps.LatLngLiteral) => void) {
    let latitude = 0;
    let longitude = 0;
    let accuracy = 0;
    if ("geolocation" in navigator) {
        const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        };

        const watchId = navigator.geolocation.watchPosition((position => {
            console.info(`GPS latitude ${position.coords.latitude} longitude ${position.coords.longitude} accuracy ${position.coords.accuracy}`);
            if (latitude != position.coords.latitude || longitude != position.coords.longitude) {
                sendMessage("/app/players", JSON.stringify({
                    gameId: game,
                    player: {
                        username: user,
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                        accuracy: position.coords.accuracy
                    }
                }));
                // Update current location
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            }

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            accuracy = position.coords.accuracy;
        }), (error) => {
            console.error(error.code + " " + error.message)
        }, options);
    } else {
        console.error("Geolocation not available");
    }
}

export default MapOverview;
