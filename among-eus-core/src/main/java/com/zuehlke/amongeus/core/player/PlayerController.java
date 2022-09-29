package com.zuehlke.amongeus.core.player;

import com.zuehlke.amongeus.core.game.GameService;
import com.zuehlke.amongeus.core.model.Game;
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
    public void kill(@DestinationVariable String gameId, final KilledMessage killedMessage) {
        logger.info("Player killed: {}", killedMessage);
        Game game = gameService.getGame(gameId);
        var killedPlayer = game.killPlayer(killedMessage.getKillerId(), killedMessage.getKilledId());
        sendPlayerKilledEvent(game, killedPlayer);
        sendPlayerList(game);
        if (game.isOver()) {
            game.gameOver();
            sendGameOverEvent(game);
        }
    }
    private void sendPlayerKilledEvent(Game game, Player player) {
        this.simpMessagingTemplate.convertAndSend("/topic/game/%s/players/killed".formatted(game.getId()), player);
    }

    private void sendPlayerList(Game game) {
        this.simpMessagingTemplate.convertAndSend("/topic/game/%s/players".formatted(game.getId()), game.getPlayers());
    }

    public void sendGameOverEvent(final Game game) {
        logger.info("GameOver: {}", game);
        simpMessagingTemplate.convertAndSend("/topic/game/%s/".formatted(game.getId()), game);
    }

    @MessageMapping("/game/{gameId}/game/start")
    @SendTo("/topic/game/{gameId}/")
    public Game startGame(@DestinationVariable String gameId, final GameStartConfigurationMessage gameStartConfigurationMessage) {
        logger.info("Starting game: {}", gameId);
        Game game = gameService.getGame(gameId);
        game.startGame(gameStartConfigurationMessage);
        return game;
    }

}