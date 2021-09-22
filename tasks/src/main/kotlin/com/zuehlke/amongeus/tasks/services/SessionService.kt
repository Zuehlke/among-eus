package com.zuehlke.amongeus.tasks.services

import com.zuehlke.amongeus.tasks.store.Session
import com.zuehlke.amongeus.tasks.store.SessionStore
import org.springframework.stereotype.Service

@Service
class SessionService {

    fun saveSession(sessionId: String, playerId: String, gameId: String) {
        SessionStore.saveSession(sessionId, playerId, gameId)
    }

    fun getBySessionId(sessionId: String): Session {
        return SessionStore.getBySessionId(sessionId)
    }
}