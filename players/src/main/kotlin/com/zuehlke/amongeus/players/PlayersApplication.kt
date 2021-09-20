package com.zuehlke.amongeus.players

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PlayersApplication

fun main(args: Array<String>) {
	runApplication<PlayersApplication>(*args)
}
