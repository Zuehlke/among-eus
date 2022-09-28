package com.zuehlke.amongeus.core.player;

import com.zuehlke.amongeus.core.game.GameService;
import com.zuehlke.amongeus.core.model.Game;
import com.zuehlke.amongeus.core.model.GameState;
import com.zuehlke.amongeus.core.model.Player;
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

    @MessageMapping("/players")
    @SendTo("/topic/players")
    public Collection<Player> createOrUpdate(final PlayerMessage message) {
        Game game = gameService.getGame(message.getGameId());
        game.updatePlayer(message.getPlayer());
        return game.getPlayers();
    }
    @MessageMapping("/players/kill")
    @SendTo("/topic/players/killed")
    public Player killed(final KilledMessage killedMessage) {
        logger.info("Player killed: {}", killedMessage);
        Game game = gameService.getGame(killedMessage.getGameId());
        var killedPlayer = game.killPlayer(killedMessage.getKillerId(), killedMessage.getKilledId());
        if (game.isOver()) {
            gameOver(game);
        }
        return killedPlayer;
    }

    @MessageMapping("/players/ready")
    @SendTo("/topic/game")
    public GameState updateGameState(final PlayerReadyMessage playerReadyMessage) {
        logger.info("Game state: {}", playerReadyMessage);
        Game game = gameService.getGame(playerReadyMessage.getGameId());
        game.startGame(playerReadyMessage);
        return game.getState();
    }

    @SendTo("/topic/game")
    public GameState gameOver(final Game game) {
        game.setState(GameState.GAME_OVER);
        logger.info("GameOver: {}", game);
        return game.getState();
    }

}