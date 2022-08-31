package com.zuehlke.amongeus.games.store

import com.zuehlke.amongeus.games.models.Game
import com.zuehlke.amongeus.games.models.Lobby
import kotlin.collections.HashMap

class LobbyStore {
    companion object {
        private val map = HashMap<String,Lobby>()

        fun saveOrUpdateLobby(lobby: Lobby): Lobby {
            map[lobby.gameId] = lobby
            return lobby
        }

        fun getLobbies(): List<Lobby> {
            return map.values.toList()
        }

        fun getLobby(key:String): Lobby? {
            return map[key]
        }

        fun getLobbyByGame(key: String): Lobby? {
            map.values.forEach {
                if (it.gameId.equals(key)) return it;
            }
            return null
        }
    }
}