import alt from '../../alt';
import TaskActions from '../actions/TaskActions';

class TaskStore {
    constructor() {
        this.tasks = [];
        this.errorMessage = null;
        this.bindListeners({
            handleUpdateTasks: TaskActions.UPDATE_TASKS,
            handleFetchTasks: TaskActions.FETCH_TASKS,
            handleTasksFailed: TaskActions.TASKS_FAILED
        });
    }

    handleUpdateTasks(tasks) {
        this.tasks = tasks;
        this.errorMessage = null;
    }

    handleFetchTasks() {
        this.tasks = [];
    }

    handleTasksFailed(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

export default alt.createStore(TaskStore, 'TaskStore');
