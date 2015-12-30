import alt from '../../alt';
import TaskActions from '../actions/TaskActions';

class TaskStore {
    constructor() {
        this.tasks = [];
        this.errorMessage = null;
        this.bindListeners({
            handleAddTask: TaskActions.ADD_TASK,
            handleUpdateTasks: TaskActions.UPDATE_TASKS,
            handleFetchTasks: TaskActions.FETCH_TASKS,
            handleTasksFailed: TaskActions.TASKS_FAILED
        });
    }

    handleAddTask(task) {
        this.tasks.push(task);
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
