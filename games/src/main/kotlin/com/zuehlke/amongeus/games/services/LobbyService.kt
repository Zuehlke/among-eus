package com.zuehlke.amongeus.games.services

import com.zuehlke.amongeus.games.models.Lobby
import com.zuehlke.amongeus.games.store.LobbyStore
import org.springframework.stereotype.Service
import java.util.*
import kotlin.collections.ArrayList

@Service
class LobbyService {

    fun getLobbies(): List<Lobby> {
        return LobbyStore.getLobbies()
    }

    fun getLobbyByGame(gameId: String): Lobby {
        return LobbyStore.getLobbyByGame(gameId)!!
    }

    fun createLobby(gameId: String): Lobby {
        val lobby = Lobby(UUID.randomUUID().toString(), gameId, ArrayList())
        LobbyStore.saveOrUpdateLobby(lobby)
        return lobby
    }

    fun addPlayerToGameLobby(gameId: String, playerId: String) {
        val lobby = LobbyStore.getLobbyByGame(gameId)
        lobby!!.playerIdTaskCountPairs.add(Pair(playerId, 0))
        LobbyStore.saveOrUpdateLobby(lobby)
    }

    fun addTaskToGameLobby(gameId: String, playerId: String) {
        val lobby = LobbyStore.getLobbyByGame(gameId)
        lobby!!.playerIdTaskCountPairs.forEach {
            if(it.first.equals(playerId)) {
                it.second.plus(1)
            }
        }
        LobbyStore.saveOrUpdateLobby(lobby)
    }

    fun removePlayerFromGameLobby(gameId: String, playerId: String) {
        val lobby = LobbyStore.getLobbyByGame(gameId)
        lobby!!.playerIdTaskCountPairs.removeIf{p -> p.first.equals(playerId)}
        println(lobby)
        LobbyStore.saveOrUpdateLobby(lobby)
    }
}