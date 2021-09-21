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
          {console.log(props)}
          {props.players.map((player: Player, index:number) => (
              <tr key={index}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.tasksCreated}</td>
              </tr>
          ))}
      </table>
      {<button hidden={!props.isHost} disabled={isPending(props.players)} id="btnStart" onClick={() => console.log("start game")}>Start game</button>}

  </div>
);

const isPending = (players: Array<Player>): boolean => {
    return players.map(player => player.tasksCreated)
        .reduce((a, b) => a + b)
        < players.length * 2;
}

Lobby.defaultProps = {
    isHost: true,
    players: [
        {"id": "1", "name": "DaniTheSlayer", "tasksCreated": 2} as Player,
        {"id": "2", "name": "SteffiTheMerciless", "tasksCreated": 2} as Player,
        {"id": "3", "name": "NicTheMad", "tasksCreated": 2} as Player,
    ]
};

export default Lobby;
