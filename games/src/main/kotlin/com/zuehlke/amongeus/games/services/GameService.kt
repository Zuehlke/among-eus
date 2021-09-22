package com.zuehlke.amongeus.games.services

import com.zuehlke.amongeus.games.models.Game
import com.zuehlke.amongeus.games.store.GameStore
import org.springframework.stereotype.Service
import java.util.*
import kotlin.collections.ArrayList

@Service
class GameService (
    private val lobbyService: LobbyService
){

    fun startGame(gameId: String) {
        //TODO: KAFKA SEND GAME START EVENT WITH GAMEID
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