import React from "react";
import './Banner.css';
import GameInfoBanner from "./GameInfoBanner";
import {Player} from "../../../utils/player";
import Task from "../../../utils/task";
import {GameState} from "../../../utils/game-state";

interface WelcomeBannerProps {
    gameId: string;
    userId: string;
    gameState: GameState;
    players: Player[];
    tasks: Task[];
}

export function WelcomeBanner(props: WelcomeBannerProps) {
    return (
        <div>
            <h2 className="title">Among Isch - {props.gameId}</h2>
            <h3 className="sub-title">Salü {props.userId}, düe Tasks plaziere!</h3>
            <GameInfoBanner gameState={props.gameState} players={props.players} tasks={props.tasks}/>
        </div>
    )
}