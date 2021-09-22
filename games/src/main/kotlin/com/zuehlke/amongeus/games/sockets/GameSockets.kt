package com.zuehlke.amongeus.games.sockets

import com.zuehlke.amongeus.games.event.CreateGameEvent
import com.zuehlke.amongeus.games.event.DeleteGameEvent
import com.zuehlke.amongeus.games.event.JoinGameEvent
import com.zuehlke.amongeus.games.event.StartGameEvent
import com.zuehlke.amongeus.games.models.Game
import com.zuehlke.amongeus.games.models.Lobby
import com.zuehlke.amongeus.games.services.GameService
import com.zuehlke.amongeus.games.services.LobbyService
import com.zuehlke.amongeus.games.services.PlayerGameSessionService
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.Header
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.simp.SimpMessageSendingOperations
import org.springframework.messaging.simp.annotation.SendToUser
import org.springframework.messaging.simp.annotation.SubscribeMapping
import org.springframework.stereotype.Controller


@Controller
class GameSockets(
        private val gameService: GameService,
        private val playerGameSessionService: PlayerGameSessionService,
        private val lobbyService: LobbyService,
        private val simp: SimpMessageSendingOperations
) {

    @SubscribeMapping("/getGames")
    fun getAllGames(): List<Game> {
        return gameService.getGames()
    }

    @MessageMapping("/create")
    @SendToUser("/getGames")
    fun createGame(createGameEvent: CreateGameEvent): Game {
        val G = gameService.createGame(createGameEvent.name, createGameEvent.ownerId)
        sendGames()
        return G
    }

    @MessageMapping("/delete")
    fun deleteGame(deleteGameEvent: DeleteGameEvent) {
        gameService.deleteGame(deleteGameEvent.gameId)
        sendGames()
    }

    @SubscribeMapping("/getLobby/{gameId}")
    fun getLobby(@DestinationVariable gameId: String): Lobby {
        println(lobbyService.getLobbyByGame(gameId))
        return lobbyService.getLobbyByGame(gameId)
    }

    @MessageMapping("/start")
    fun startGame(startGameEvent: StartGameEvent) {
        gameService.startGame(startGameEvent.gameId)
        simp.convertAndSend("/startGame/" + startGameEvent.gameId, null)
    }

    @MessageMapping("/join")
    fun joinGame(@Header("simpSessionId") sessionId: String, joinGameEvent: JoinGameEvent) {
        playerGameSessionService.createPlayerGameSession(sessionId, joinGameEvent.gameId, joinGameEvent.playerId)
        sendLobby(joinGameEvent.gameId)
    }

    @MessageMapping("/leave")
    fun leaveGame(@Header("simpSessionId") sessionId: String) {
        val playerGameSession = playerGameSessionService.deletePlayerGameSession(sessionId)
        sendLobby(playerGameSession.gameId)
    }

    fun sendGames() {
        simp.convertAndSend("/getGames", gameService.getGames())
    }

    fun sendLobby(gameId: String) {
        simp.convertAndSend("/getLobby/$gameId", lobbyService.getLobbyByGame(gameId))
    }
}