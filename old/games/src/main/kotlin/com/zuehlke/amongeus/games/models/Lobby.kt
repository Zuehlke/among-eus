package com.zuehlke.amongeus.games.models

data class Lobby(val lobbyId: String, val gameId: String, val playerIdTaskCountPairs: ArrayList<Pair<String, Int>>)