package com.zuehlke.amongeus.core.model;


import com.zuehlke.amongeus.core.task.TaskCreatedMessage;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

public class Game {

    private String id;

    private Map<String, Player> players = new ConcurrentHashMap<>();

    private Map<String, Task> tasks = new ConcurrentHashMap<>();

    public Game() {
    }

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
        players.put(player.getUsername(), player);
    }

    public Player killPlayer(String killerId, String killedId) {
//        TODO: check whether player can  be killed: isAlive, is near (10m), isImposter
        Player player = players.get(killedId);
        player.setAlive(false);
        return player;
    }

    public synchronized void createTask(TaskCreatedMessage message) {
        var id = tasks.size() + 1;
        var task = message.createTask(String.valueOf(id));
        tasks.put(task.getId(), task);
    }

    public void completeTask(String taskId) {
        tasks.get(taskId).setCompleted(true);
    }

    public Collection<Task> getTasks() {
        return tasks.values();
    }

}
