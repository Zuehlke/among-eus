import React from 'react';
import './Lobby.css';

interface Player {
    id: string;
    name: string;
    tasksCreated: number;
}

interface LobbyProps {
    players: Array<Player>
}

const Lobby = (props: LobbyProps) => (
  <div className="Lobby">
    Lobby Component
      <table>
          <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Country</th>
          </tr>
          {console.log(props)}
          {props.players.map((player: Player) => (
              <tr>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.tasksCreated}</td>
              </tr>
          ))}
      </table>
  </div>
);

Lobby.defaultProps = {
    players: [
        {"id": "1", "name": "DaniTheSlayer", "tasksCreated": 1} as Player,
        {"id": "2", "name": "SteffiTheMerciless", "tasksCreated": 0} as Player,
        {"id": "3", "name": "NicTheMad", "tasksCreated": 2} as Player,
    ]
};

export default Lobby;
