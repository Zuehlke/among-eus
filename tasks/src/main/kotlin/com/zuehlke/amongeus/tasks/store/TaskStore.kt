package com.zuehlke.amongeus.tasks.store

class TaskStore {
    companion object {
        private val map = HashMap<String,String>()

        fun saveOrUpdateTask(key:String, game: String) {
            map[key] = game
        }

        fun getTask(key:String): String? {
            return map[key]
        }
    }

}