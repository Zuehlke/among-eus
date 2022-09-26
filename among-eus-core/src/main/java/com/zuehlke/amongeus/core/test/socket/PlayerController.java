package com.zuehlke.amongeus.core.test.socket;

import com.zuehlke.amongeus.core.test.model.Game;
import com.zuehlke.amongeus.core.test.model.Player;
import com.zuehlke.amongeus.core.test.service.GameService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Collection;

@Controller
public class PlayerController {

    private static final Logger logger = LoggerFactory.getLogger(PlayerController.class);

    private final GameService gameService;

    public PlayerController(GameService gameService) {
        this.gameService = gameService;
    }

    @MessageMapping("/positions")
    @SendTo("/topic/positions")
    public Collection<Player> send(final PlayerMessage message) {

        logger.info("Player: {}", message);

        Game game = gameService.getGame(message.getGameId());
        game.updatePlayer(message.getPlayer());

        return game.getPlayers();
    }

}