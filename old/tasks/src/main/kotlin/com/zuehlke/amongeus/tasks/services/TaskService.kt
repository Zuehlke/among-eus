package com.zuehlke.amongeus.tasks.services

import com.zuehlke.amongeus.tasks.kafka.KafkaPublisher
import com.zuehlke.amongeus.tasks.model.CompleteTaskEvent
import com.zuehlke.amongeus.tasks.model.CreateTaskEvent
import com.zuehlke.amongeus.tasks.model.GameStartEvent
import com.zuehlke.amongeus.tasks.model.Task
import com.zuehlke.amongeus.tasks.sockets.TaskDistributor
import com.zuehlke.amongeus.tasks.store.TaskStore
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*
import kotlin.collections.HashMap

@Service
class TaskService {

    @Autowired
    private lateinit var kafkaPublisher: KafkaPublisher

    @Autowired
    private lateinit var taskDistributor: TaskDistributor

    fun createTask(createTaskEvent: CreateTaskEvent): Task {
        val task = Task(UUID.randomUUID().toString(), createTaskEvent.lat, createTaskEvent.long,
                createTaskEvent.imgBase64, createTaskEvent.creatorId, createTaskEvent.gameId)
        TaskStore.saveOrUpdateTask(task)
        kafkaPublisher.sendCreateTask(task)
        return task
    }

    fun completeTask(completeTaskEvent: CompleteTaskEvent): Task {
        val task = TaskStore.getTask(completeTaskEvent.taskId)
        //TODO: some checks like location proximity check and check if player is the assigned player
        task.completed = true
        TaskStore.saveOrUpdateTask(task)
        kafkaPublisher.sendCompleteTask(task)
        return task
    }


    fun startGame(gameStartEvent: GameStartEvent) {
        val assignedTasks = distributeTasks(gameStartEvent)
        sendTasks(assignedTasks)
    }

    fun distributeTasks(gameStartEvent: GameStartEvent): List<Task> {
        val tasksForGame = TaskStore.getTasksForGame(gameStartEvent.gameId)

        val playerTaskCounts = HashMap<String,Int>()
        gameStartEvent.playerIds.forEach { playerTaskCounts[it] = 0 }

        val mutablePlayersList = gameStartEvent.playerIds.toMutableList()

        tasksForGame.forEach {
            if (!mutablePlayersList.isEmpty()) {
                val currentPlayerId = mutablePlayersList.random()

                // assign player to task
                it.assignedPlayerId = currentPlayerId

                // make sure that no player gets more than two tasks
                playerTaskCounts[currentPlayerId] = playerTaskCounts[currentPlayerId]!! + 1
                if (playerTaskCounts[currentPlayerId]!! >= 2) {
                    mutablePlayersList.remove(currentPlayerId)
                }
            }
        }

        return tasksForGame
    }

    fun sendTasks(tasks: List<Task>) {
        taskDistributor.sendAssignedTasks(tasks)
    }

}