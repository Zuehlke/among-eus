import {Player} from "./player";
import Task from "./task";

const RADIUS_OF_WORLD_IN_METER = 6_371_000;

// TODO reduce interface
export function findNearestAlivePlayer(players: Player[], me: Player): Player | null {
    let closestPlayer = null;
    let minDistance = Number.MAX_SAFE_INTEGER;

    players.forEach((player) => {
        if (player.username !== me.username) {
            const distance = getDistanceInMeter(me, player);
            if (distance < minDistance && player.alive && me.alive) {
                closestPlayer = player;
                minDistance = distance;
            }
        }
    });

    return closestPlayer;
}

// TODO add test
export function findNearestUnsolvedTask(tasks: Task[], me: Player): Task | null {
    let closestTask = null;
    let minDistance = Number.MAX_SAFE_INTEGER;

    tasks.filter(task => !task.completed)
        .forEach(task => {
            const distance = getDistanceInMeter(me, task);
            if (distance < minDistance) {
                closestTask = task;
                minDistance = distance;
            }
        });
    return closestTask;
}

// TODO export interface
export interface HasPosition {
    latitude: number;
    longitude: number;
}

export function getDistanceInMeter(p1: HasPosition, p2: HasPosition): number {
    const dLat: number = deg2rad(p1.latitude - p2.latitude);
    const dLon: number = deg2rad(p1.longitude - p2.longitude);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(p1.latitude)) * Math.cos(deg2rad(p2.latitude)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return RADIUS_OF_WORLD_IN_METER * c;
}

function deg2rad(deg: number): number {
    return deg * (Math.PI/180);
}
