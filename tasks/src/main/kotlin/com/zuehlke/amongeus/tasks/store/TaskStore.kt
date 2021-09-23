package com.zuehlke.amongeus.tasks.store

import com.zuehlke.amongeus.tasks.model.Task

class TaskStore {
    companion object {
        private val map = HashMap<String,Task>()

        fun saveOrUpdateTask(task: Task) {
            map[task.taskId] = task
        }

        fun getTask(taskId: String): Task {
            return map[taskId]!!
        }

        fun getTasksForGame(gameId: String): List<Task> {
            return map.values.filter { it.gameId == gameId }
        }

    }

}