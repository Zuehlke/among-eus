import {Role} from "./role";
import {GameState} from "./game-state";

export interface Game {
    state: GameState;
    winner: Role;
}