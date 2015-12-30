import _ from 'lodash';
import alt from '../../alt';
import TaskActions from '../actions/TaskActions';

class TaskStore {
    constructor() {
        this.tasks = [];
        this.errorMessage = null;
        this.bindListeners({
            handleAddTask: TaskActions.ADD_TASK,
            handleRemoveTask: TaskActions.REMOVE_TASK,
            handleCompleteTask: TaskActions.COMPLETE_TASK,
            handleUpdateTasks: TaskActions.UPDATE_TASKS,
            handleFetchTasks: TaskActions.FETCH_TASKS,
            handleTasksFailed: TaskActions.TASKS_FAILED
        });
    }

    handleAddTask(task) {
        this.tasks.push(task);
    }

    handleRemoveTask(id) {
        this.tasks = _.filter(this.tasks, task => {
            return task.id !== id;
        });
    }

    handleCompleteTask(id) {
        let task = _.find(this.tasks, task => {
            return task.id === id
        });
        task.done = true;
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
