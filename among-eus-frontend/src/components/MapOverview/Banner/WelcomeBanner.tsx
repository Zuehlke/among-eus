import React from "react";
import './Banner.css';

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