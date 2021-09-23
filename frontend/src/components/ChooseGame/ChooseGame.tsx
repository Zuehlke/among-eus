import React, {useState} from 'react';
import './ChooseGame.css';
import logo from "../../links/logo.png";

export interface Game {
    gameId: string;
    name: string;
    ownerId?: string;
}

const ChooseGame = (props: any) => {
    const [selectedGameId, setSelectedGameId] = useState("");
    const [selectedRowStyle, setSelectedRowStyle] = useState("");

    function selectGameId(id: string) {
        setSelectedGameId(id);
        setSelectedRowStyle("selected-tr");
    }

    return (
        <div className="ChooseGame flex-container full-height flex-flow-column overflow-hidden">
            <div className="header">
                <img alt="Logo" src={logo}/>
            </div>
            <div className="button-container center">
                <button id="btnHostGame" onClick={props.onHostGame}>Host New Game</button>
            </div>
            {props.games.length > 0 &&
            <div className="flex-container flex-flow-column overflow-hidden">
                <div className="component-element-container scroll">
                    <table className="">
                        <tbody>
                        {props.games.map((game: Game) => {
                            return <tr className={selectedGameId === game.gameId ? selectedRowStyle : ''}
                                       key={game.gameId}
                                       onClick={() => selectGameId(game.gameId)}>
                                <td>{game.name}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="button-container center ">
                   <button hidden={!selectedGameId} id="btnJoinGame" className="" onClick={() => props.onLobbyJoin(selectedGameId)}>
                        Join Game
                    </button>
                </div>
            </div>
            }
        </div>
    );
}

export default ChooseGame;
