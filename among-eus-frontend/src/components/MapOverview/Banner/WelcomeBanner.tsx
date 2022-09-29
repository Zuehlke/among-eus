import React from "react";
import './Banner.css';

interface WelcomeBannerProps {
    gameId: string;
    userId: string;
}

export function WelcomeBanner(props: WelcomeBannerProps) {
    return (
        <div>
            <h2 className="title">Among Isch - {props.gameId}</h2>
            <h3 className="sub-title">Salü {props.userId}, düe Tasks plaziere!</h3>
        </div>
    )
}