import React from 'react';
import ReactDOM from 'react-dom';
import MapOverview from './MapOverview';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapOverview gameId="" userId="" />, div);
  ReactDOM.unmountComponentAtNode(div);
});