import React, { FC } from 'react';
import './MapOverview.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faUser} from '@fortawesome/free-solid-svg-icons'

interface MapOverviewProps {
    userId: string | null;
    gameId: string | null;
}

const MapOverview: FC<MapOverviewProps> = (props) => (
  <div>
    <h2 className="title">Among Eus - {props.gameId}</h2>
      <h3 className="sub-title">Welcome {props.userId}</h3>
      <div className="numberOfPlayer"><FontAwesomeIcon icon={faUser} /> 7 Players - <FontAwesomeIcon icon={faCheck} /> 5 Tasks</div>
      <div className="map"></div>
      <div className="action-bar">
          <div className="action-bar-child">Daniel (7 Meter)</div>
          <div className="action-bar-child">
              <button>umtue</button>
          </div>
      </div>
  </div>
);

export default MapOverview;
