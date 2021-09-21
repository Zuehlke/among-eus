package com.zuehlke.amongeus.games.store


import com.zuehlke.amongeus.games.models.PlayerGameSession

class PlayerGameSessionStore {
    companion object {
        private val map = HashMap<String, PlayerGameSession>()

        fun saveOrUpdatePlayerGameSession(playerGameSession: PlayerGameSession): PlayerGameSession {
            map[playerGameSession.sessionId] = playerGameSession
            return playerGameSession
        }

        fun getPlayerGameSessions(): List<PlayerGameSession> {
            return map.values.toList()
        }

        fun getPlayerGameSession(key: String): PlayerGameSession? {
            return map[key]
        }

        fun deletePlayerGameSession(key: String) {
            map.remove(key)
        }

        fun getPlayerGameSessionsByGame(gameId: String): List<PlayerGameSession> {
            val list = ArrayList<PlayerGameSession>()
            map.values.forEach {
                if(it.gameId.equals(gameId)) {
                    list.add(it)
                }
            }
            return list
        }
    }
}