package com.zuehlke.amongeus.games.models

data class Game(val gameId: String, val name: String, val ownerId: String,
                val tasksCompletedPairs: ArrayList<Pair<String, Boolean>>, val ready: Boolean)