package com.zuehlke.amongeus.tasks.model

data class CreateTaskEvent(val long: Float, val lat: Float, val imgBase64: String, val creatorId: String, val gameId: String)
