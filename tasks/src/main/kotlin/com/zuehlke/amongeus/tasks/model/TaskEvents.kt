package com.zuehlke.amongeus.tasks.model

data class CreateTaskEvent(val long: Float, val lat: Float, val imgBase64: String, val creatorId: String, val gameId: String)

data class CompleteTaskEvent(val taskId:String, val long: Float, val lat: Float, val imgBase64: String, val gameId: String, val playerId: String)
