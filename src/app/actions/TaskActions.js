import alt from '../../alt';
import TaskSource from '../sources/TaskSource';
import UUID from 'node-uuid';

/**
 * provides the {@link ActionsClass} for the task list application
 */
export class TaskActions {

    /**
     * adds a new task to the task list
     * @param {string} name - name of the new task
     * @return {Object} - new task
     */
    addTask(name) {
        let task = {
            id: UUID.v4(),
            done: false,
            name
        };
        return task;
    }

    /**
     * removes a task from the task list
     * @param {string} id - task id of task to be removed
     * @return {string} - task id of task to be removed
     */
    removeTask(id) {
        return id;
    }

    /**
     * marks a task as done
     * @param {string} id - task id of task to be marked
     * @return {string} - task id of task to be marked
     */
    completeTask(id) {
        return id;
    }

    /**
     * updates task list
     * @param {Array<Object>} tasks - new tasks
     * @return {Array<Object>} new tasks
     */
    updateTasks(tasks) {
        return tasks;
    }

    /** @private */
    saveTasks(tasks) {
        return tasks;
    }

    /**
     * fetches task list data from local or remote sources
     * @return {function} fetcher
     */
    fetchTasks() {
        return dispatch => {
            dispatch();
            // try local first
            TaskSource.fetchLocal()
                .then(tasks => this.updateTasks(tasks))
                .catch(errorMessage => {
                    // no local tasks, read remote tasks
                    window.console.log(`${errorMessage}`);
                    TaskSource.fetchRemote()
                        .then(tasks => this.updateTasks(tasks))
                        .catch(errorMessage => this.tasksFailed(errorMessage));
                });
        };
    }

    /**
     * reports an error fetching task list data
     * @param {string} errorMessage - rror message
     * @return {string} error message
     */
    tasksFailed(errorMessage) {
        return errorMessage;
    }
}

export default alt.createActions(TaskActions);
