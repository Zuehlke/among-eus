package com.zuehlke.amongeus.players.events

data class GameStartedEvent(var gameId: String, var playerIds: List<String>)
