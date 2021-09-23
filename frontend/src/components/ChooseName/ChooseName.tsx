import React, {useState} from 'react';
import './ChooseName.css';
import logo from '../../links/logo.png';

const ChooseName = (props: any) => {

    const [playerName, setPlayerName] = useState('');

    return (
        <div className="ChooseName">
            <div className="logo">
                <img alt="Logo" src={logo}/>
                <p>Among Eus</p>
            </div>
            <div className="ChooseName center big-space-top">
                <input type="text" placeholder="Enter your name" maxLength={20} onChange={event => setPlayerName(event.target.value)} />
                <button id="btnSubmit" disabled={!playerName} onClick={() => props.onNameChosen(playerName)} className="space-top" >Send</button>
            </div>
        </div>
    )
};

export default ChooseName;
