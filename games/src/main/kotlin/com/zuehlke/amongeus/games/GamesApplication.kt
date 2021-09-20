package com.zuehlke.amongeus.games

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class GamesApplication

fun main(args: Array<String>) {
	runApplication<GamesApplication>(*args)
	Thread.sleep(20000)

}
