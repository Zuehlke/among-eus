import React from 'react';
import ReactDOM from 'react-dom';
import MapOverview from './MapOverview';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapOverview gameId="" userId="" winner={null} players={[]} tasks={[]} gameState={"GAME_RUNNING"} killedPlayer={null} />, div);
  ReactDOM.unmountComponentAtNode(div);
});