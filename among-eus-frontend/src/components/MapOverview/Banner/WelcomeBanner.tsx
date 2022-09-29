import React from "react";
import './Banner.css';
import GameInfoBanner from "./GameInfoBanner";
import {Player} from "../../../utils/player";
import Task from "../../../utils/task";
import {GameState} from "../../../utils/game-state";

interface WelcomeBannerProps {
    userId: string;
}

export function WelcomeBanner(props: WelcomeBannerProps) {
    return (
        <div>
            <h3 className="sub-title">Salü {props.userId}, düe Tasks plaziere!</h3>
        </div>
    )
}