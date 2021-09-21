package com.zuehlke.amongeus.tasks.store

class SessionStore {
    companion object {
        private val sessionMap = HashMap<String, Session>()
        private val playerMap = HashMap<String, Session>()

        fun saveSession(sessionId: String, playerId: String, gameId:String) {
            playerMap[playerId] = Session(sessionId, playerId, gameId)
            sessionMap[sessionId] = Session(sessionId, playerId, gameId)
        }

        fun getBySessionId(sessionId: String): Session {
            return sessionMap[sessionId]!!
        }

        fun getByPlayerId(playerId: String): Session {
            return playerMap[playerId]!!
        }
    }
}