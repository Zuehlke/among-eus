import React, {useState} from 'react';
import './ChooseGame.css';

interface Game {
    id: string;
    name: string;
}

const games: Game[] = [
    {id: "1", name: "Game Steffi"},
    {id: "2", name: "Game Dani"},
    {id: "3", name: "Game Nicolas"}
];

const ChooseGame = () => {
    const [selectedGameId, setSelectedGameId] = useState("");
    const [selectedRowStyle, setSelectedRowStyle] = useState("");

    function selectGameId(id: string){
        setSelectedGameId(id);
        setSelectedRowStyle("selected-row");
    }

    return (
        <div className="ChooseGame">
            <button id="btnHostGame" onClick={() => console.log("Host Game")}>Host New Game</button>
            <hr/>
            <div className="flex-container">
                <table>
                    <tbody>
                    {games.map(game => {
                        return <tr className={ selectedGameId === game.id ? selectedRowStyle : ''} key={game.id} onClick={() => selectGameId(game.id)}>
                            <td>{game.name}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
                <button hidden={!selectedGameId} id="btnJoinGame" onClick={() => console.log(selectedGameId)}>Join Game</button>
            </div>
        </div>
    );
}

export default ChooseGame;
