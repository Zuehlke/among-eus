import React, {FC, useCallback, useEffect, useState} from 'react';
import './MapOverview.css';
import {sendMessage} from "../../utils/websocket-client";
import {Status, Wrapper} from '@googlemaps/react-wrapper';
import PlayerMap from "./PlayerMap/PlayerMap";
import Marker, {MarkerTypes} from "./Marker/Marker";
import {registerCallback, startGpsTracking2} from "../../utils/gps-tracking";
import {Player} from "../../utils/player";
import {findNearestAlivePlayer, findNearestUnsolvedTask, getDistanceInMeter} from "../../utils/distance-calculator";
import {KillBanner} from "./Banner/KillBanner";
import Task from "../../utils/task";
import GameStartBanner from "./Banner/GameStartBanner";
import {Role} from "../../utils/role";
import {SolveTask} from "./SolveTask/SolveTask";
import {GameState} from "../../utils/game-state";
import GameInfoBanner from "./Banner/GameInfoBanner";

interface MapOverviewProps {
    userId: string;
    gameId: string;
    players: Player[];
    tasks: Task[];
    gameState: GameState;
    killedPlayer: Player | null;
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

            sendOwnPosition(props.gameId, props.userId, position);
        });

        return () => {
            navigator.geolocation.clearWatch(watchId);
        }
    }, [props.gameId, props.userId]);

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


    const createTask = useCallback(() => {
        doCreateTask(props.gameId, currentLocation);
    }, [props.gameId, currentLocation]);

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

    function getRoleCurrentUser(): Role | null {
        const currentUser = props.players.find((player) => player.username === props.userId);
        if (currentUser) {
            return currentUser.role;
        }
        return null;
    }

    return (
        <div>
            <h2 className="title">Among Eus - {props.gameId}
                {
                    getRoleCurrentUser() !== Role.UNASSIGNED ? (
                        <p className="role">Dü bisch {getRoleCurrentUser()}</p>
                    ) : (
                        <p className="role">Düe d Tasks platziere!</p>
                    )
                }
            </h2>
            <h3 className="sub-title">Welcome {props.userId}</h3>
            <GameInfoBanner gameState={props.gameState} players={props.players} tasks={props.tasks}/>
            {
                props.killedPlayer &&
                <div className="kill-notification">{props.killedPlayer.username} isch gstorbe</div>
            }
            <Wrapper apiKey="AIzaSyC3PzqgCWeT_lrobprlTEz1SmVQ443n2Mg" render={renderMapStatus}>
                <PlayerMap center={currentLocation} zoom={18}>
                    {
                        props.players.filter((player) => player.alive).map((player) => {
                            const type = props.userId === player.username ? MarkerTypes.PLAYER : MarkerTypes.OPPONENT;
                            return <Marker key={player.username} position={{
                                lat: player.latitude,
                                lng: player.longitude,
                            }} labelName={player.username} labelType={type}></Marker>
                        })
                    }
                    {
                        props.tasks
                            .filter(task => !task.completed)
                            .map(task => {
                                return <Marker key={task.id} position={{
                                    lat: task.latitude,
                                    lng: task.longitude,
                                }} labelName={'Task ' + task.id} labelType={MarkerTypes.TASK}></Marker>
                            })
                    }
                </PlayerMap>
            </Wrapper>
            {
                closestPlayer && distanceToClosestPlayer <= 10 && props.gameState === "GAME_RUNNING" && getRoleCurrentUser() === Role.TERRORIST &&
                <KillBanner username={closestPlayer.username} distance={distanceToClosestPlayer.toFixed(1)}
                            onKill={kill}/>
            }
            {
                closestTask && distanceToClosestTask <= 10 && props.gameState === "GAME_RUNNING" && getRoleCurrentUser() === Role.AGENT &&
                <SolveTask taskId={closestTask.id} distance={distanceToClosestTask} onSolve={solveTask}></SolveTask>
            }
            {
                props.gameState === "WAITING_FOR_PLAYERS" &&
                <div className="action-bar">
                    <div className="action-bar-child">Üfgab platziere</div>
                    <div className="action-bar-child">
                        <button className="task-action-button" onClick={createTask}>Üfgab do platziere</button>
                    </div>
                </div>
            }
            {
                props.gameState === "WAITING_FOR_PLAYERS" &&
                <GameStartBanner players={props.players} gameId={props.gameId}/>
            }
        </div>
    )
};

function doCreateTask(gameId: string, position: google.maps.LatLngLiteral) {
    sendMessage(`/app/game/${gameId}/tasks`, JSON.stringify({
        longitude: position.lng,
        latitude: position.lat
    }));
}

function doKill(gameId: string, killerId: string, killedId: string) {
    sendMessage(`/app/game/${gameId}/players/kill`, JSON.stringify({
        killerId,
        killedId
    }));
}

function doSolveTask(gameId: string, task: Task) {
    sendMessage(`/app/game/${gameId}/tasks/complete`, JSON.stringify({
        taskId: task.id,
    }))
}

function sendOwnPosition(gameId: string, userId: string, position: GeolocationPosition) {
    sendMessage(`/app/game/${gameId}/players`, JSON.stringify({
        username: userId,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        accuracy: position.coords.accuracy
    }));
}


export default MapOverview;
