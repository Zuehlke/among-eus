package com.zuehlke.amongeus.tasks.services

import com.zuehlke.amongeus.tasks.store.SessionStore
import org.springframework.stereotype.Service

@Service
class SessionService {

    fun saveSession(sessionId: String, playerId: String) {
        SessionStore.saveSession(sessionId, playerId)
    }

    fun getSessionId(playerId: String): String {
        return SessionStore.getSessionId(playerId)
    }

    fun getPlayerId(sessionId: String): String {
        return SessionStore.getPlayerId(sessionId)
    }
}