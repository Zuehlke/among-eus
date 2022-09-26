package com.zuehlke.amongeus.core.test.model;


import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class Game {

    private String id;
    private Map<String, Player> players = new ConcurrentHashMap<>();


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
}
