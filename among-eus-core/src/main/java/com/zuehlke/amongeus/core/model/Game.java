package com.zuehlke.amongeus.core.model;


import java.util.Collection;
import java.util.Map;
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
        players.put(player.getUsername(), player);
    }

    public void updateTask(Task task) {
        tasks.put(task.getId(), task);
    }

    public void completeTask(String taskId) {
        tasks.get(taskId).setCompleted(true);
    }

    public Collection<Task> getTasks() {
        return tasks.values();
    }
}
