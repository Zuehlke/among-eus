package com.zuehlke.amongeus.tasks.store

class SessionStore {
    companion object {
        private val sessionMap = HashMap<String, String>()
        private val playerMap = HashMap<String, String>()

        fun saveSession(sessionId: String, playerId: String) {
            sessionMap[playerId] = sessionId
            playerMap[sessionId] = playerId
        }

        fun getSessionId(playerId: String): String {
            return sessionMap[playerId]!!
        }

        fun getPlayerId(sessionId: String): String {
            return playerMap[sessionId]!!
        }
    }
}