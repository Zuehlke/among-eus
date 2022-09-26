package com.zuehlke.amongeus.core.game;

import com.zuehlke.amongeus.core.model.Game;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GameService {


    private final Map<String, Game> games = new ConcurrentHashMap<>();

    public Game getGame(String id) {
        return games.computeIfAbsent(id, Game::new);
    }

}
