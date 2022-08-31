package com.zuehlke.amongeus.games.event

data class CreateGameEvent(val name: String, val ownerId: String)
data class DeleteGameEvent(val gameId: String)
data class StartGameEvent(val gameId: String)
data class JoinGameEvent(val playerId: String, val gameId: String)