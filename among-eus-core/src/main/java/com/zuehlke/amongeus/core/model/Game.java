package com.zuehlke.amongeus.core.model;


import com.zuehlke.amongeus.core.utility.DistanceCalculator;

import com.zuehlke.amongeus.core.task.TaskCreatedMessage;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

public class Game {

    public static final double MIN_DISTANCE_TO_KILL = 10;

    private String id;
    private GameState state = GameState.WAITING_FOR_PLAYERS;

    private Map<String, Player> players = new ConcurrentHashMap<>();

    private Map<String, Task> tasks = new ConcurrentHashMap<>();

    public Game(String id) {
        this.id = id;
    }

    public Collection<Player> getPlayers() {
        return players.values();
    }

    public void setPlayers(Map<String, Player> players) {
        this.players = players;
    }

    public void updatePlayer(Player player) {
        Optional<Player> playerOptional = Optional.ofNullable(players.get(player.getUsername()));
        playerOptional.ifPresent(value -> player.setAlive(value.isAlive()));
        if (playerOptional.isEmpty() && !state.equals(GameState.WAITING_FOR_PLAYERS)) {
            throw new IllegalStateException("New player is not allowed to join, game is in state: "+ state);
        }
        players.put(player.getUsername(), player);
    }

    public Player killPlayer(String killerId, String killedId) {

        var killerPlayer = players.get(killerId);
        var killedPlayer = players.get(killedId);

        if(!killedPlayer.isAlive() || !killerPlayer.isAlive()){
            throw new IllegalStateException("Both players must be alive to kill!");
        }
        if(!isNearEnoughToKill(killerPlayer, killedPlayer)){
            throw new IllegalStateException("Players are not near enough to kill!");
        }
        //TODO: is imposter
        killedPlayer.setAlive(false);
        return killedPlayer;
    }

    private boolean isNearEnoughToKill(Player killer, Player killed){
        return DistanceCalculator.getDistanceInMeter(killer, killed) <= MIN_DISTANCE_TO_KILL;
    }

    public void startGame() {
        if(state != GameState.WAITING_FOR_PLAYERS){
            throw new IllegalStateException("Game is in "+ state +" state, and can not be started!");
        }
        state = GameState.GAME_RUNNING;
    }

    public GameState getState() {
        return state;
    }

    public synchronized void createTask(TaskCreatedMessage message) {
        if(!state.equals(GameState.WAITING_FOR_PLAYERS)){
            throw new IllegalStateException("Unable to create task, because game state is "+ state);
        }
        var id = tasks.size() + 1;
        var task = message.createTask(String.valueOf(id));
        tasks.put(task.getId(), task);
    }

    public void completeTask(String taskId) {
        if(!state.equals(GameState.GAME_RUNNING)){
            throw new IllegalStateException("Unable to complete tasks in game state: "+ state);
        }
        tasks.get(taskId).setCompleted(true);
    }

    public Collection<Task> getTasks() {
        return tasks.values();
    }
}
