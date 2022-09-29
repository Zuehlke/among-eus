import React from "react";
import {Role} from "../../../utils/role";
import './Banner.css';
import GameInfoBanner from "./GameInfoBanner";
import {GameState} from "../../../utils/game-state";
import {Player} from "../../../utils/player";
import Task from "../../../utils/task";

interface PlayerStatusBannerProps {
    gameId: string;
    userId: string;
    isAlive: boolean | undefined;
    role: Role | null;
    gameState: GameState;
    players: Player[];
    tasks: Task[];
}

export function PlayerStatusBanner(props: PlayerStatusBannerProps) {
    return (
        <div>
            <h2 className="title">Among Isch - {props.gameId}</h2>
            <h3 className="sub-title">{props.userId} -
                {
                    props.isAlive ? <b> {props.role}</b> : <b> dü bisch tot</b>
                }
            </h3>
            <GameInfoBanner gameState={props.gameState} players={props.players} tasks={props.tasks}/>
        </div>
    )
}