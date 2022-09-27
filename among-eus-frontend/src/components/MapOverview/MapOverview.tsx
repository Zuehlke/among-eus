import React, {FC} from 'react';
import './MapOverview.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faUser} from '@fortawesome/free-solid-svg-icons'
import {sendMessage} from "../../utils/websocket-client";

interface MapOverviewProps {
    userId: string | null;
    gameId: string | null;
}

const MapOverview: FC<MapOverviewProps> = (props) => {
    if (props.gameId && props.userId) {
        startGpsTracking(props.gameId, props.userId);
    }

    return (
        <div>
            <h2 className="title">Among Eus - {props.gameId}</h2>
            <h3 className="sub-title">Welcome {props.userId}</h3>
            <div className="numberOfPlayer"><FontAwesomeIcon icon={faUser}/> 7 Players - <FontAwesomeIcon
                icon={faCheck}/> 5
                Tasks
            </div>
            <div className="map"></div>
            <div className="action-bar">
                <div className="action-bar-child">Daniel (7 Meter)</div>
                <div className="action-bar-child">
                    <button>umtue</button>
                </div>
            </div>
        </div>
    )
};

function startGpsTracking(game: string, user: string) {
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
                sendMessage("/app/positions", JSON.stringify({
                    game,
                    user,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                }));
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
