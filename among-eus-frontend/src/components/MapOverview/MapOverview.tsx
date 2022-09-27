import React, {FC} from 'react';
import './MapOverview.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faUser} from '@fortawesome/free-solid-svg-icons'
import {Status, Wrapper} from '@googlemaps/react-wrapper';
import PlayerMap from "./PlayerMap/PlayerMap";
import Marker, {MarkerTypes} from "./PlayerMap/Marker";

interface MapOverviewProps {
    userId: string | null;
    gameId: string | null;
}

const renderMapStatus = (status: Status) => {
    return <h1>{status}</h1>;
};

const MapOverview: FC<MapOverviewProps> = (props) => {
    startGpsTracking();

    // TODO use GPS positioning
    const center = {
        lat: 47.0443195,
        lng: 8.465423,
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
                <PlayerMap center={center} zoom={18}>
                    <Marker key={1} position={center} labelName={'Me'} labelType={MarkerTypes.PLAYER}></Marker>
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

function startGpsTracking() {
    if ("geolocation" in navigator) {
        const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        };

        const watchId = navigator.geolocation.watchPosition((position => {
            console.info(`GPS latitude ${position.coords.latitude} longitude ${position.coords.longitude} accuracy ${position.coords.accuracy}`);
        }), (error) => {
            console.error(error.code + " " + error.message)
        }, options);
    } else {
        console.error("Geolocation not available");
    }
}

export default MapOverview;
