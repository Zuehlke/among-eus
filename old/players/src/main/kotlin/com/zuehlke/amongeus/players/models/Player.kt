package com.zuehlke.amongeus.players.models

data class Player(val id: String, val name: String, var gameId: String, var isLiving: Boolean, var isImposter: Boolean,
    var long: Double, var lat: Double)