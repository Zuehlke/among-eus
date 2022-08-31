package com.zuehlke.amongeus.games.event

data class GameStartEvent(val gameId: String, val playerIds: List<String>)