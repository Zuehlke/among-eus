import React, {FC, useEffect, useState} from 'react';
import './MapOverview.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faUser} from '@fortawesome/free-solid-svg-icons'
import {sendMessage} from "../../utils/websocket-client";
import {Status, Wrapper} from '@googlemaps/react-wrapper';
import PlayerMap from "./PlayerMap/PlayerMap";
import Marker, {MarkerTypes} from "./Marker/Marker";
import {registerCallback, startGpsTracking2} from "../../utils/gps-tracking";
import {Player} from "../../utils/player";

interface MapOverviewProps {
    userId: string;
    gameId: string;
    players: Player[];
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

    const createTask = () => {
        doCreateTask(props.gameId, currentLocation);
    }

    return (
        <div>
            <h2 className="title">Among Eus - {props.gameId}</h2>
            <h3 className="sub-title">Welcome {props.userId}</h3>
            <div className="numberOfPlayer"><FontAwesomeIcon icon={faUser}/> {props.players.length} Players - <FontAwesomeIcon
                icon={faCheck}/> 5
                Tasks
            </div>
            <Wrapper apiKey="AIzaSyC3PzqgCWeT_lrobprlTEz1SmVQ443n2Mg" render={renderMapStatus}>
                <PlayerMap center={currentLocation} zoom={18}>
                    {
                        props.players.map((player) => {
                            const type = props.userId === player.username ? MarkerTypes.PLAYER : MarkerTypes.OPPONENT;
                            return <Marker key={player.username} position={{
                                lat: player.latitude,
                                lng: player.longitude,
                            }} labelName={player.username} labelType={type}></Marker>
                        })
                    }
                </PlayerMap>
            </Wrapper>
            <div className="action-bar">
                <div className="action-bar-child">Daniel (7 Meter)</div>
                <div className="action-bar-child">
                    <button className="kill-action-button">umtue</button>
                </div>
            </div>
            <div className="action-bar">
                <div className="action-bar-child">Task platziere</div>
                <div className="action-bar-child">
                    <button className="task-action-button" onClick={createTask}>Task do platziere</button>
                </div>
            </div>
            <div className="action-bar">
                <div className="action-bar-child">Start Game</div>
                <div className="action-bar-child">
                    <button className="game-action-button">starte</button>
                </div>
            </div>
        </div>
    )
};

function doCreateTask(gameId: string, position: google.maps.LatLngLiteral) {
    sendMessage("/app/tasks", JSON.stringify({
        gameId: gameId,
        longitude: position.lng,
        latitude: position.lat
    }));
}


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
