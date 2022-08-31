package com.zuehlke.amongeus.games.services

import com.zuehlke.amongeus.games.event.GameStartEvent
import com.zuehlke.amongeus.games.kafka.KafkaPublisher
import com.zuehlke.amongeus.games.models.Game
import com.zuehlke.amongeus.games.store.GameStore
import org.springframework.stereotype.Service
import java.util.*
import kotlin.collections.ArrayList

@Service
class GameService (
    private val lobbyService: LobbyService,
    private val kafkaPublisher: KafkaPublisher
){

    fun startGame(gameId: String) {
        val playerIds = lobbyService.getPlayersInLobby(gameId)
        val gameStartEvent = GameStartEvent(gameId, playerIds)
        kafkaPublisher.sendGameStarted(gameStartEvent)
    }

    fun getGames(): List<Game> {
        return GameStore.getGames()
    }

    fun createGame(name: String, ownerId: String): Game {
        val game = Game(UUID.randomUUID().toString(), name, ownerId, ArrayList(),false)
        GameStore.saveOrUpdateGame(game)
        val lobby = lobbyService.createLobby(game.gameId)
        lobbyService.addPlayerToGameLobby(lobby.gameId, ownerId)
        return game
    }

    fun deleteGame(gameId: String) {
        GameStore.deleteGame(gameId)
    }
}