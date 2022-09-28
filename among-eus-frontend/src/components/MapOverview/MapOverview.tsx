import React, {FC, useCallback, useEffect, useState} from 'react';
import './MapOverview.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faUser} from '@fortawesome/free-solid-svg-icons'
import {sendMessage} from "../../utils/websocket-client";
import {Status, Wrapper} from '@googlemaps/react-wrapper';
import PlayerMap from "./PlayerMap/PlayerMap";
import Marker, {MarkerTypes} from "./Marker/Marker";
import {registerCallback, startGpsTracking2} from "../../utils/gps-tracking";
import {Player} from "../../utils/player";
import {findNearestAlivePlayer, findNearestUnsolvedTask, getDistanceInMeter} from "../../utils/distance-calculator";
import {KillBanner} from "./Banner/KillBanner";
import Task from "../../utils/task";
import {SolveTask} from "./SolveTask/SolveTask";

interface MapOverviewProps {
    userId: string;
    gameId: string;
    players: Player[];
    tasks: Task[];
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

    const me: Player | undefined = props.players.find((element) => element.username === props.userId);
    let distanceToClosestPlayer: number = 0;
    let distanceToClosestTask: number = -1;
    let closestTask: Task | null = null;
    let closestPlayer: Player | null = null;
    if (me) {
        closestPlayer = findNearestAlivePlayer(props.players, me);
        closestTask = findNearestUnsolvedTask(props.tasks, me);
        if (closestPlayer) {
            distanceToClosestPlayer = getDistanceInMeter(me, closestPlayer);
        }
        if (closestTask) {
            distanceToClosestTask = getDistanceInMeter(me, closestTask);
        }
    }

    useEffect(() => {
        registerCallback((position) => {
            sendOwnPosition(props.gameId, props.userId, position);
        });
    }, [props.gameId, props.userId]);

    const createTask = () => {
        doCreateTask(props.gameId, currentLocation);
    }

    const kill = useCallback(() => {
        if (closestPlayer) {
            doKill(props.gameId, props.userId, closestPlayer.username);
        }
    }, [props.gameId, props.userId, closestPlayer]);

    const solveTask = () => {
        if (closestTask) {
            doSolveTask(props.gameId, closestTask);
        }
    };

    return (
        <div>
            <h2 className="title">Among Eus - {props.gameId}</h2>
            <h3 className="sub-title">Welcome {props.userId}</h3>
            <div className="numberOfPlayer"><FontAwesomeIcon icon={faUser}/> {props.players.length} Players
                - <FontAwesomeIcon
                    icon={faCheck}/> {props.tasks.length}
                Task(s)
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
                    {
                        props.tasks.map(task => {
                            return <Marker key={task.id} position={{
                                lat: task.latitude,
                                lng: task.longitude,
                            }} labelName={'Task ' + task.id} labelType={MarkerTypes.TASK}></Marker>
                        })
                    }
                </PlayerMap>
            </Wrapper>
            {
                closestPlayer && distanceToClosestPlayer <= 10 &&
                <KillBanner username={closestPlayer.username} distance={distanceToClosestPlayer.toFixed(1)}
                            onKill={kill}/>
            }
            {
                closestTask && distanceToClosestTask <= 10 &&
                <SolveTask taskId={closestTask.id} distance={distanceToClosestTask} onSolve={solveTask}></SolveTask>
            }
            <div className="action-bar">
                <div className="action-bar-child">Üfgab platziere</div>
                <div className="action-bar-child">
                    <button className="task-action-button" onClick={createTask}>Üfgab do platziere</button>
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

function doKill(gameId: string, killerId: string, killedId: string) {
    sendMessage("/app/players/kill", JSON.stringify({
        gameId,
        killerId,
        killedId
    }));
}

function doSolveTask(gameId: string, task: Task) {
    sendMessage('/app/tasks/complete', JSON.stringify({
        gameId,
        taskId: task.id,
    }))
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
