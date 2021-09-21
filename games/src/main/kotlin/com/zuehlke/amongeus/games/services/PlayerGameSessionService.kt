package com.zuehlke.amongeus.games.services

import com.zuehlke.amongeus.games.models.PlayerGameSession
import com.zuehlke.amongeus.games.store.PlayerGameSessionStore
import org.springframework.stereotype.Service

@Service
class PlayerGameSessionService(
        private val lobbyService: LobbyService
) {

    fun createPlayerGameSession(sessionId: String, gameId: String, playerId: String): PlayerGameSession {
        val P = PlayerGameSession(sessionId, gameId, playerId)
        PlayerGameSessionStore.saveOrUpdatePlayerGameSession(P)
        lobbyService.addPlayerToGameLobby(gameId, playerId)
        return P
    }

    fun deletePlayerGameSession(sessionId: String): PlayerGameSession {
        val playerGameSession = PlayerGameSessionStore.deletePlayerGameSession(sessionId)!!
        lobbyService.removePlayerFromGameLobby(playerGameSession.gameId, playerGameSession.playerId)
        return playerGameSession
    }

    fun getPlayerGameSessionsByGame(gameId: String): List<PlayerGameSession> {
        return PlayerGameSessionStore.getPlayerGameSessionsByGame(gameId)
    }
}