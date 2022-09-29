import React, {FC, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Player} from "../../../utils/player";
import {sendMessage} from "../../../utils/websocket-client";

interface GameStartBannerProps {
    players: Player[];
    gameId: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const GameStartBanner: FC<GameStartBannerProps> = (props) => {

    const [open, setOpen] = useState(false);
    const [numberOfTerrorists, setNumberOfTerrorists] = React.useState(getInitialNumberOfTerrorists());
    const options = createTerroristOptions()
    const openGameStartDialog = () => setOpen(true);
    const closeGameStartDialog = () => setOpen(false);
    const changeNumberOfTerrorists = (event: any) => {
        setNumberOfTerrorists(event.target.value);
        console.debug("Number of terrorists set to " + event.target.value)
    };
    const startGame = () => {
        let numberOfTerroristsAsInt = parseInt(numberOfTerrorists)
        console.debug(`starting game ${props.gameId} with ${numberOfTerroristsAsInt} Terrorists`)
        sendMessage(`/app/game/${props.gameId}/start`, JSON.stringify({
            numberOfTerrorists: numberOfTerroristsAsInt
        }));
        closeGameStartDialog();
    }

    function createTerroristOptions() {
        let numberOfOptions = Math.max(Math.floor(props.players.length / 2.0),1);
        let result = []
        for (let i = 0; i< numberOfOptions; i++) {
            result.push({ label: (i+1) + ' Walliser', value: '' + (i+1) })
        }
        return result;
    }

    function getInitialNumberOfTerrorists() {
        return '' + Math.max(Math.ceil(props.players.length / 4.0),1);
    }

    return (
        <div>
            <div className="action-bar">
                <div className="action-bar-child">Spiel starte</div>
                <div className="action-bar-child">
                    <button onClick={openGameStartDialog} className="game-action-button">starte</button>
                </div>
            </div>
            <Modal
                open={open}
                onClose={closeGameStartDialog}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h2" component="h2">
                        Spiel startu
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <b>Azahl Spiler:</b> {props.players.length}
                        </div>
                        <div>&nbsp;</div>
                        <div>
                            Wievill Walliser willt dü ha?
                        </div>
                        <label htmlFor="number-of-terrorists">Azahl Walliser</label>
                        <select id="number-of-terrorists" value={numberOfTerrorists} onChange={changeNumberOfTerrorists}>
                            {Array.from(new Set(options)).map((option) => (
                                <option value={option.value} key={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <div>&nbsp;</div>
                        <div>
                            <b>Üfgepasst:</b> Sobald dü es Spill gstartet hesch, chat kei neue Spiler mehr derzüe cho!
                        </div>
                        <div>
                            <button onClick={closeGameStartDialog} className="cancel-button">Wartu uf witeri Spiler</button>
                            <button onClick={startGame}>Startu</button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );

}

export default GameStartBanner