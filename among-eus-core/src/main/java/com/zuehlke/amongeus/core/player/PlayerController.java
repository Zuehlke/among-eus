package com.zuehlke.amongeus.core.player;

import com.zuehlke.amongeus.core.game.GameService;
import com.zuehlke.amongeus.core.model.Game;
import com.zuehlke.amongeus.core.model.GameState;
import com.zuehlke.amongeus.core.model.Player;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class PlayerController {

    private static final Logger logger = LoggerFactory.getLogger(PlayerController.class);

    private final GameService gameService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    public PlayerController(GameService gameService, SimpMessagingTemplate simpMessagingTemplate) {
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/game/{gameId}/players")
    @SendTo("/topic/game/{gameId}/players")
    public void createOrUpdate(@DestinationVariable String gameId, final Player player) {
        Game game = gameService.getGame(gameId);
        game.updatePlayer(player);
        sendPlayerList(game);
    }

    @MessageMapping("/game/{gameId}/players/kill")
    @SendTo("/topic/game/{gameId}/players/killed")
    public Player killed(@DestinationVariable String gameId, final KilledMessage killedMessage) {
        logger.info("Player killed: {}", killedMessage);
        Game game = gameService.getGame(gameId);
        var killedPlayer = game.killPlayer(killedMessage.getKillerId(), killedMessage.getKilledId());
        if (game.isOver()) {
            gameOver(game);
        }
        sendPlayerList(game);
        return killedPlayer;
    }

    private void sendPlayerList(Game game) {
        this.simpMessagingTemplate.convertAndSend("/topic/game/%s/players".formatted(game.getId()), game.getPlayers());
    }

    @MessageMapping("/game/{gameId}/game/start")
    @SendTo("/topic/game/{gameId}/")
    public GameState startGame(@DestinationVariable String gameId, final GameStartConfigurationMessage gameStartConfigurationMessage) {
        logger.info("Starting game: {}", gameId);
        Game game = gameService.getGame(gameId);
        game.startGame(gameStartConfigurationMessage);
        return game.getState();
    }

    @SendTo("/topic/game/{gameId}/")
    public GameState gameOver(final Game game) {
        game.setState(GameState.GAME_OVER);
        logger.info("GameOver: {}", game);
        return game.getState();
    }

}