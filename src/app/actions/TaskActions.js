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

    removeTask(id) {
        return id;
    }

    completeTask(id) {
        return id;
    }

    updateTasks(tasks) {
        return tasks;
    }

    saveTasks(tasks) {
        return tasks;
    }

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

    tasksFailed(errorMessage) {
        return errorMessage;
    }
}

export default alt.createActions(TaskActions);
