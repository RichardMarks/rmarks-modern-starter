import alt from '../../alt';
import TaskSource from '../sources/TaskSource';
import UUID from 'node-uuid';

class TaskActions {

    addTask(name) {
        let task = {
            id: UUID.v4(),
            done: false,
            name
        };
        return task;
    }

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
