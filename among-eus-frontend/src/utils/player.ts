import {Role} from "./role";

export interface Player {
    username: string;
    latitude: number;
    longitude: number;
    accuracy: number;
    alive: boolean;
    role: Role;
}