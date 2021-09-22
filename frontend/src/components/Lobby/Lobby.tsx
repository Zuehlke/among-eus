import React from 'react';
import './Lobby.css';
import {Client} from "@stomp/stompjs";

interface Pair {
    [key: string]: number;
}

interface Lobby {
    gameId: string;
    playerIdTaskCountPairs: Array<Pair>;
}

interface LobbyProps {
    lobby?: Lobby;
    isHost: boolean;
    numberOfTasks: number;
    gameId: string;
    client: Client;
}

const Lobby = (props: LobbyProps) => (
    <div className="Lobby">
        Lobby Component
        <table>
            <thead>
            <tr>
                <th>id</th>
                <th>tasks created</th>
            </tr>
            </thead>
            <tbody>
            {props.lobby?.playerIdTaskCountPairs.map((player:Pair, index: number) => (
                <tr key={index}>
                    <td>{player.first}</td>
                    <td>{player.second}/{props.numberOfTasks}</td>
                </tr>
            ))}
            </tbody>
        </table>
        {<button hidden={!props.isHost} disabled={isPending(props)} id="btnStart"
                 onClick={() => console.log("start game")}>Start game</button>}

    </div>
);

const isPending = (props: LobbyProps): boolean => {
    return props.lobby?.playerIdTaskCountPairs.some(player => player.tasksCreated < props.numberOfTasks) as boolean;
}

export default Lobby;
