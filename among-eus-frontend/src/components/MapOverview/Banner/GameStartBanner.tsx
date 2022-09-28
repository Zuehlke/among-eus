import React, {FC} from 'react';
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
    top: '5%',
    left: '5%',
    transform: 'translate(-5%, -5%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const GameStartBanner: FC<GameStartBannerProps> = (props) => {

    const [open, setOpen] = React.useState(false);
    const [numberOfTerrorists, setNumberOfTerrorists] = React.useState('1');

    const options = [
        { label: '1 Wallüsser', value: '1' },
        { label: numberOfTerroristsForNPlayers(2) + ' Wallüsser', value: numberOfTerroristsForNPlayers(2) },
        { label: numberOfTerroristsForNPlayers(4) + ' Wallüsser', value: numberOfTerroristsForNPlayers(4) },
    ];
    const openGameStartDialog = () => setOpen(true);
    const closeGameStartDialog = () => setOpen(false);
    const changeNumberOfTerrorists = (event: any) => {
        setNumberOfTerrorists(event.target.value);
        console.log("Number of terrorists set to " + event.target.value)
    };
    const startGame = () => {
        console.log("starting game " + props.gameId + " with " + numberOfTerrorists + " Terrorists")
        sendMessage("/app/players/ready", JSON.stringify({
            gameId: props.gameId,
            numberOfTerrorists
        }));
        closeGameStartDialog();
    }

    function numberOfTerroristsForNPlayers(percentage: number) {
        return Math.ceil(props.players.length / percentage);
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
                            <b>Azahl Spielür:</b> {props.players.length}
                        </div>
                        <div>
                            Wievieli Wallüsser wüisch Dü denn Dü in Dim Spielu?
                        </div>
                        <label htmlFor="number-of-terrorists">Azahl Wallüsser</label>
                        <select id="number-of-terrorists" value={numberOfTerrorists} onChange={changeNumberOfTerrorists}>
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <div>
                            <b>Üfgepasst:</b> Sobald Du s Spiel gstartut häsch, chan kei neuu Spelur mä drzue cho!
                        </div>
                        <div>
                            <button onClick={startGame}>Start</button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );

}

export default GameStartBanner