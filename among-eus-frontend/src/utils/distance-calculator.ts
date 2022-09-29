import {Player} from "./player";
import Task from "./task";
import {HasPosition} from "./has-position";
import {Role} from "./role";

const RADIUS_OF_WORLD_IN_METER = 6_371_000;

export function findNearestAliveAgent(players: Player[], me: Player): Player | null {
    let closestPlayer = null;
    let minDistance = Number.MAX_SAFE_INTEGER;

    players
        .filter(player => player.role === Role.AGENT)
        .filter(player => player.alive)
        .filter(player => player.username !== me.username)
        .forEach((player) => {
            const distance = getDistanceInMeter(me, player);
            if (distance < minDistance) {
                closestPlayer = player;
                minDistance = distance;
            }
        });

    return closestPlayer;
}

export function findNearestUnsolvedTask(tasks: Task[], center: HasPosition): Task | null {
    let closestTask = null;
    let minDistance = Number.MAX_SAFE_INTEGER;

    tasks.filter(task => !task.completed)
        .forEach(task => {
            const distance = getDistanceInMeter(center, task);
            if (distance < minDistance) {
                closestTask = task;
                minDistance = distance;
            }
        });
    return closestTask;
}

export function getDistanceInMeter(p1: HasPosition, p2: HasPosition): number {
    const dLat: number = deg2rad(p1.latitude - p2.latitude);
    const dLon: number = deg2rad(p1.longitude - p2.longitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(p1.latitude)) * Math.cos(deg2rad(p2.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return RADIUS_OF_WORLD_IN_METER * c;
}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}
