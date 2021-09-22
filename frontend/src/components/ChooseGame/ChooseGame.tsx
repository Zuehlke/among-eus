import React, {useState} from 'react';
import './ChooseGame.css';
import logo from "../../links/logo.png";

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
        setSelectedRowStyle("selected-tr");
    }

    return (
        <div className="ChooseGame">
            <div className="flex-container full-height flex-flow-column">
                <div className="header flex-container flex-flow-row" >
                    <img alt="Logo" src={logo}/>
                </div>
                <div className="component-element-container flex-grow">
                    <div className="flex-container align-items-center">
                        <button id="btnHostGame" onClick={() => console.log("Host Game")} >Host New Game</button>
                    </div>
                </div>
                {games.length > 0 &&
                <div className="component-element-container flex-grow overflow-hidden">
                    <div className="height-100-percent flex-container flex-flow-row">
                        {/*TODO make table scrollable */}
                        <div className="flex-container align-items-center scroll">
                                <table className="margin-left">
                                    <tbody>
                                    {games.map(game => {
                                        return <tr className={ selectedGameId === game.id ? selectedRowStyle : ''} key={game.id} onClick={() => selectGameId(game.id)}>
                                            <td>{game.name}</td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                        </div>
                        <div className="flex-container align-items-center flex-grow">
                            <button hidden={!selectedGameId} id="btnJoinGame" onClick={() => console.log(selectedGameId)}>Join Game</button>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}

export default ChooseGame;
