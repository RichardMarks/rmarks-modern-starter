import _ from 'lodash';
import alt from '../../alt';
import TaskActions from '../actions/TaskActions';
import TaskSource from '../sources/TaskSource';

/**
 * provides the {@link StoreModel} for the task list application
 * @see http://alt.js.org/docs/createStore/
 */
export class TaskStore {
    /**
     * class constructor - binds {@link Action}s to handlers
     */
    constructor() {
        /**
         * state: list of tasks in task list
         * @type {Array<Object>}
         */
        this.tasks = [];
        
        /**
         * state: an error message for reporting fetching errors
         * @type {string}
         */
        this.errorMessage = null;

        this.bindListeners({
            handleAddTask: TaskActions.ADD_TASK,
            handleRemoveTask: TaskActions.REMOVE_TASK,
            handleCompleteTask: TaskActions.COMPLETE_TASK,
            handleUpdateTasks: TaskActions.UPDATE_TASKS,
            handleSaveTasks: TaskActions.SAVE_TASKS,
            handleFetchTasks: TaskActions.FETCH_TASKS,
            handleTasksFailed: TaskActions.TASKS_FAILED
        });
    }

    /**
     * action handler for adding a new task to the task list
     *
     * side effect: tasks are saved after the new task is added
     * @param {Object} task - new task
     */
    handleAddTask(task) {
        this.tasks.push(task);
        this.handleSaveTasks();
    }

    /**
     * action handler for removing a task from the task list
     *
     * side effect: tasks are saved after the task is removed
     * @param {string} id - id of the task to be removed
     */
    handleRemoveTask(id) {
        this.tasks = _.filter(this.tasks, task => {
            return task.id !== id;
        });
        this.handleSaveTasks();
    }

    /**
     * action handler for marking a task as done
     *
     * side effect: tasks are saved after the task is marked
     * @param {string} id - id of the task to be marked
     */
    handleCompleteTask(id) {
        let task = _.find(this.tasks, task => {
            return task.id === id
        });
        task.done = true;
        this.handleSaveTasks();
    }

    /**
     * action handler for updating the task list
     * @param {Array<Object>} tasks - new task list data
     */
    handleUpdateTasks(tasks) {
        this.tasks = tasks;
        this.errorMessage = null;
    }

    /**
     * action handler for saving task list data to localStorage
     */
    handleSaveTasks() {
        TaskSource.saveLocal(this.tasks);
    }

    /**
     * action handler for fetching new task list data
     *
     * side effect: all tasks are removed to prepare for fetched data
     */
    handleFetchTasks() {
        this.tasks = [];
    }

    /**
     * action handler for reporting an error message
     */
    handleTasksFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

export default alt.createStore(TaskStore, 'TaskStore');
