package com.zuehlke.amongeus.core.task;

import com.zuehlke.amongeus.core.game.GameService;
import com.zuehlke.amongeus.core.model.Game;
import com.zuehlke.amongeus.core.model.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Collection;

@Controller
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    private final GameService gameService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    public TaskController(GameService gameService, SimpMessagingTemplate simpMessagingTemplate) {
        this.gameService = gameService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/game/{gameId}/tasks")
    @SendTo("/topic/game/{gameId}/tasks")
    public Collection<Task> create(@DestinationVariable String gameId, final TaskCreatedMessage message) {

        logger.info("Task created: {}", message);

        Game game = gameService.getGame(gameId);

        game.createTask(message);

        return game.getTasks();
    }

    @MessageMapping("/game/{gameId}/tasks/complete")
    @SendTo("/topic/game/{gameId}/tasks")
    public Collection<Task> complete(@DestinationVariable String gameId, final TaskCompletedMessage message) {

        logger.info("Task completed: {}", message);

        Game game = gameService.getGame(gameId);

        game.completeTask(message.getTaskId());

        if (game.isOver()) {
            sendGameStatusEvent(game);
        }
        return game.getTasks();
    }

    public void sendGameStatusEvent(Game game) {
        simpMessagingTemplate.convertAndSend("/topic/game/%s".formatted(game.getId()), game);
        logger.info("Sent Game status event: {}", game);
    }


}