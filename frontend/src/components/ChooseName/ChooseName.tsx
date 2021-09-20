import React from 'react';
import './ChooseName.css';

const ChooseName = () => (
  <div className="ChooseName">
    <input type="text" />
    <button id="btnSubmit" onClick={() => console.log("sent")}>Send</button>
  </div>
);

export default ChooseName;
