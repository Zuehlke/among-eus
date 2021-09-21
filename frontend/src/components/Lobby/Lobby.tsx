import React from 'react';
import './Lobby.css';

interface Player {
    id: string;
    name: string;
    tasksCreated: number;
}

interface LobbyProps {
    isHost: boolean;
    players: Array<Player>
    numberOfTasks: number
}

const Lobby = (props: LobbyProps) => (
    <div className="Lobby">
        Lobby Component
        <table>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>tasks created</th>
            </tr>
            <tbody>
            {props.players.map((player: Player, index: number) => (
                <tr key={index}>
                    <td>{player.name}</td>
                    <td>{player.tasksCreated}/{props.numberOfTasks}</td>
                </tr>
            ))}
            </tbody>
        </table>
        {<button hidden={!props.isHost} disabled={isPending(props)} id="btnStart"
                 onClick={() => console.log("start game")}>Start game</button>}

    </div>
);

const isPending = (props: LobbyProps): boolean => {
    return props.players.some(player => player.tasksCreated < props.numberOfTasks);
}

Lobby.defaultProps = {
    numberOfTasks: 2,
    isHost: true,
    players: [
        {"id": "1", "name": "DaniTheSlayer", "tasksCreated": 2} as Player,
        {"id": "2", "name": "SteffiTheMerciless", "tasksCreated": 2} as Player,
        {"id": "3", "name": "NicTheMad", "tasksCreated": 1} as Player,
    ]
};

export default Lobby;
