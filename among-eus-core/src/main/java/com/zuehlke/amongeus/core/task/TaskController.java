package com.zuehlke.amongeus.core.task;

import com.zuehlke.amongeus.core.game.GameService;
import com.zuehlke.amongeus.core.model.Game;
import com.zuehlke.amongeus.core.model.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Collection;

@Controller
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    private final GameService gameService;

    public TaskController(GameService gameService) {
        this.gameService = gameService;
    }

    @MessageMapping("/tasks")
    @SendTo("/topic/tasks")
    public Collection<Task> create(final TaskCreatedMessage message) {

        logger.info("Task created: {}", message);

        Game game = gameService.getGame(message.getGameId());

        game.updateTask(message.createTask());

        return game.getTasks();
    }

    @MessageMapping("/tasks/complete")
    @SendTo("/topic/tasks")
    public Collection<Task> complete(final TaskCompletedMessage message) {

        logger.info("Task completed: {}", message);

        Game game = gameService.getGame(message.getGameId());

        game.completeTask(message.getTaskId());

        return game.getTasks();
    }

}