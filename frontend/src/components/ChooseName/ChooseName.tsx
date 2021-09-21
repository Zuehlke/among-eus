import React, {useState} from 'react';
import './ChooseName.css';

const ChooseName = (props: any) => {

    const [playerName, setPlayerName] = useState('')

    return (
        <div className="ChooseName">
            <input type="text" onChange={event => setPlayerName(event.target.value)}/>
            <button id="btnSubmit" onClick={() => props.onNameChosen(playerName)}>Send</button>
        </div>
    )
};

export default ChooseName;
