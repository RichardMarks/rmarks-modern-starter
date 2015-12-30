import alt from '../../alt';
import TaskSource from '../sources/TaskSource';

class TaskActions {
    updateTasks(tasks) {
        return tasks;
    }

    fetchTasks() {
        return dispatch => {
            dispatch();
            TaskSource.fetch()
                .then(tasks => this.updateTasks(tasks))
                .catch(errorMessage => this.tasksFailed(errorMessage));
        };
    }

    tasksFailed(errorMessage) {
        return errorMessage;
    }
}

export default alt.createActions(TaskActions);
