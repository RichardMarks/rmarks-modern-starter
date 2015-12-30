import _ from 'lodash';
import alt from '../../alt';
import TaskActions from '../actions/TaskActions';
import TaskSource from '../sources/TaskSource';

class TaskStore {
    constructor() {
        this.tasks = [];
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

    handleAddTask(task) {
        this.tasks.push(task);
        this.handleSaveTasks();
    }

    handleRemoveTask(id) {
        this.tasks = _.filter(this.tasks, task => {
            return task.id !== id;
        });
        this.handleSaveTasks();
    }

    handleCompleteTask(id) {
        let task = _.find(this.tasks, task => {
            return task.id === id
        });
        task.done = true;
        this.handleSaveTasks();
    }

    handleUpdateTasks(tasks) {
        this.tasks = tasks;
        this.errorMessage = null;
    }

    handleSaveTasks() {
        TaskSource.saveLocal(this.tasks);
    }

    handleFetchTasks() {
        this.tasks = [];
    }

    handleTasksFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

export default alt.createStore(TaskStore, 'TaskStore');
