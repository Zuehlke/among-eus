package com.zuehlke.amongeus.players.event

data class CreateEvent(val name: String)
data class KilledEvent(val playerId: String)
data class UpdatePositionEvent(val playerId: String, val lat: Double, val long: Double)