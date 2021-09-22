package com.zuehlke.amongeus.players.models

data class Player(val id: String, val name: String, val gameId: String, val isLiving: Boolean, val isImposter: Boolean,
    val long: Float, val lat: Float)