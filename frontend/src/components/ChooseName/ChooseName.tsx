import React, {ChangeEvent, useState} from 'react';
import './ChooseName.css';

const ChooseName = () => {

    const [name, setName] = useState("");

    return(
        <div className="ChooseName center big-space-top">
            <input type="text" placeholder="Enter your name" maxLength={20} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
            <button id="btnSubmit" disabled={!name} onClick={() => console.log(name)} className="space-top" >Send</button>
        </div>
    );
}

export default ChooseName;
