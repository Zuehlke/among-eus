package com.zuehlke.amongeus.core.test.socket;

import com.zuehlke.amongeus.core.test.model.Player;

public class PlayerMessage {

    private String gameId;

    private Player player;

    public PlayerMessage() {
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }
}
