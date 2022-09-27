package com.zuehlke.amongeus.core.model;


import com.zuehlke.amongeus.core.utility.DistanceCalculator;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

public class Game {

    public static final double MIN_DISTANCE_TO_KILL = 10;

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
        Optional<Player> playerOptional = Optional.ofNullable(players.get(player.getUsername()));
        playerOptional.ifPresent(value -> player.setAlive(value.isAlive()));
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
}
