package com.zuehlke.amongeus.tasks

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TasksApplication

fun main(args: Array<String>) {
	runApplication<TasksApplication>(*args)
}
