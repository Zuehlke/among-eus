package com.zuehlke.amongeus.core.model;


import com.zuehlke.amongeus.core.player.GameStartConfigurationMessage;
import com.zuehlke.amongeus.core.task.TaskCreatedMessage;
import com.zuehlke.amongeus.core.utility.DistanceCalculator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import static com.zuehlke.amongeus.core.model.GameState.*;

public class Game {

    private static final Logger logger = LoggerFactory.getLogger(Game.class);
    public static final double MIN_DISTANCE_TO_KILL = 10;

    private String id;
    private GameState state = WAITING_FOR_PLAYERS;
    private Map<String, Player> players = new ConcurrentHashMap<>();

    private Map<String, Task> tasks = new ConcurrentHashMap<>();

    private PlayerRole winner;

    public Game(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
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
        playerOptional.ifPresent(value -> player.setRole(value.getRole()));
        if (playerOptional.isEmpty() && !state.equals(WAITING_FOR_PLAYERS)) {
            throw new IllegalStateException("New player is not allowed to join, game is in state: " + state);
        }
        players.put(player.getUsername(), player);
        logger.info("Updated {}", player);
    }

    public Player killPlayer(String killerId, String killedId) {
        var killerPlayer = players.get(killerId);
        var killedPlayer = players.get(killedId);

        validateKilling(killerPlayer, killedPlayer);
        killedPlayer.setAlive(false);
        return killedPlayer;
    }

    private boolean isNearEnoughToKill(Player killer, Player killed) {
        return DistanceCalculator.getDistanceInMeter(killer, killed) <= MIN_DISTANCE_TO_KILL;
    }

    public void startGame(final GameStartConfigurationMessage gameStartConfigurationMessage) {
        if (state != WAITING_FOR_PLAYERS) {
            throw new IllegalStateException("Game is in " + state + " state, and can not be started!");
        }
        assignPlayerRoles(gameStartConfigurationMessage.getNumberOfTerrorists());
        state = GAME_RUNNING;
    }

    private void assignPlayerRoles(int numberOfTerrorists) {
        getPlayers().forEach(p -> p.setRole(PlayerRole.AGENT));
        var playerList = new ArrayList<>(getPlayers());
        Collections.shuffle(playerList);
        for (int i = 0; i < numberOfTerrorists && i < playerList.size(); i++) {
            var imposter = playerList.get(i);
            imposter.setRole(PlayerRole.TERRORIST);
        }
        logger.info("Assigned player roles with {} terrorists. The assigned terrorist roles are very secret - so not logged for GDPR reasons ;-)", numberOfTerrorists);
    }

    public void gameOver() {
        winner = calculateWinner().orElseThrow(() -> new IllegalStateException("Can not detect winner"));
        state = GAME_OVER;
        logger.info("Game Over. {}", this);
    }

    public GameState getState() {
        return state;
    }

    public PlayerRole getWinner() {
        return winner;
    }

    public synchronized void createTask(TaskCreatedMessage message) {
        if (!state.equals(WAITING_FOR_PLAYERS)) {
            throw new IllegalStateException("Unable to create task, because game state is " + state);
        }
        var id = tasks.size() + 1;
        var task = message.createTask(String.valueOf(id));
        tasks.put(task.getId(), task);
    }

    public void completeTask(String taskId) {
        if (!state.equals(GAME_RUNNING)) {
            throw new IllegalStateException("Unable to complete tasks in game state: " + state);
        }
        tasks.get(taskId).setCompleted(true);
        if (areAllTasksCompleted()) {
            gameOver();
        }
    }

    private boolean areAllTasksCompleted() {
        return tasks.values().stream().allMatch(Task::isCompleted);
    }

    public Collection<Task> getTasks() {
        return tasks.values();
    }

    private void validateKilling(Player killerPlayer, Player killedPlayer) {
        if (!killedPlayer.isAlive() || !killerPlayer.isAlive()) {
            throw new IllegalStateException("Both players must be alive to kill!");
        }
        if (!isNearEnoughToKill(killerPlayer, killedPlayer)) {
            throw new IllegalStateException("Players are not near enough to kill!");
        }
        if (killerPlayer.getRole() != PlayerRole.TERRORIST) {
            throw new IllegalStateException("User with role " + killerPlayer.getRole() + " can not kill");
        }
        if (killedPlayer.getRole() != PlayerRole.AGENT) {
            throw new IllegalStateException("User with role " + killedPlayer.getRole() + " can not be killed.");
        }
        if (state != GAME_RUNNING) {
            throw new IllegalStateException("Can not kill in game state " + state);
        }
    }

    public boolean isOver() {
        var noRemainingTerrorist = getPlayers().stream()
                .filter(p -> p.getRole() == PlayerRole.TERRORIST)
                .noneMatch(Player::isAlive);
        var noRemainingAgent = getPlayers().stream()
                .filter(p -> p.getRole() == PlayerRole.AGENT)
                .noneMatch(Player::isAlive);
        return noRemainingTerrorist || noRemainingAgent;
    }

    public Optional<PlayerRole> calculateWinner() {
        if (areAllTasksCompleted()) { // game over by all tasks done
            return Optional.of(PlayerRole.AGENT);
        }
        var allAgentsDead = getPlayers().stream()
                .filter(p -> p.getRole() == PlayerRole.AGENT)
                .noneMatch(Player::isAlive);
        if (allAgentsDead) { // game over by killing
            return Optional.of(PlayerRole.TERRORIST);
        }
        return Optional.empty();
    }

    @Override
    public String toString() {
        return "Game{" +
                "id='" + id + '\'' +
                ", state=" + state +
                ", winner=" + winner +
                ", players=" + players +
                ", tasks=" + tasks +
                '}';
    }
}
