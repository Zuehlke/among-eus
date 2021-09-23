package com.zuehlke.amongeus.tasks.model

data class GameStartEvent(val gameId: String, val playerIds: List<String>)