import React, {FC, useEffect, useState} from 'react';
import './MapOverview.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faUser} from '@fortawesome/free-solid-svg-icons'
import {sendMessage} from "../../utils/websocket-client";
import {Status, Wrapper} from '@googlemaps/react-wrapper';
import PlayerMap from "./PlayerMap/PlayerMap";
import Marker, {MarkerTypes} from "./Marker/Marker";
import {registerCallback, startGpsTracking2} from "../../utils/gps-tracking";

interface MapOverviewProps {
    userId: string;
    gameId: string;
    players: any[] | null;
}

const renderMapStatus = (status: Status) => {
    return <h1>{status}</h1>;
};

const MapOverview: FC<MapOverviewProps> = (props) => {
    const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral>({
        lat: 47,
        lng: 8,
    });

    useEffect(() => {
        const watchId = startGpsTracking2();
        registerCallback((position: GeolocationPosition) => {
            setCurrentLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });

        return () => {
            navigator.geolocation.clearWatch(watchId);
        }
    }, []);

    useEffect(() => {
        registerCallback((position) => {
            sendOwnPosition(props.gameId, props.userId, position);
        });
    }, [props.gameId, props.userId]);

    const otherPlayer = {
        lat: 47.0444195,
        lng: 8.466423,
    }

    return (
        <div>
            <h2 className="title">Among Eus - {props.gameId}</h2>
            <h3 className="sub-title">Welcome {props.userId}</h3>
            <div className="numberOfPlayer"><FontAwesomeIcon icon={faUser}/> {props.players?.length} Players - <FontAwesomeIcon
                icon={faCheck}/> 5
                Tasks
            </div>
            <Wrapper apiKey="AIzaSyC3PzqgCWeT_lrobprlTEz1SmVQ443n2Mg" render={renderMapStatus}>
                <PlayerMap center={currentLocation} zoom={18}>
                    <Marker key={1} position={currentLocation} labelName={'Me'} labelType={MarkerTypes.PLAYER}></Marker>
                    <Marker key={2} position={otherPlayer} labelName={'Fabio'}
                            labelType={MarkerTypes.OPPONENT}></Marker>
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

function sendOwnPosition(gameId: string, userId: string, position: GeolocationPosition) {
    sendMessage("/app/players", JSON.stringify({
        gameId: gameId,
        player: {
            username: userId,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            accuracy: position.coords.accuracy
        }
    }));
}


export default MapOverview;
