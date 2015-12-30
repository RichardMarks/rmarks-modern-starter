import React from 'react';
import ReactDom from 'react-dom';
import {BaseComponent} from './BaseComponent';
import {TaskList} from './TaskList';
import {AddTask} from './AddTask';
import TaskStore from '../stores/TaskStore';
import TaskActions from '../actions/TaskActions';

export class App extends BaseComponent {
    constructor() {
        super('onChange');
        this.state = TaskStore.getState();
    }

    render() {
        if (this.state.errorMessage) {
            return (
                <div className="text-danger">{this.state.errorMessage}</div>
            );
        }

        if (this.state.tasks.length === 0) {
            return (
                <div><i className="fa fa-spinner"></i>Loading...</div>
            );
        }

        return (
            <div>
                <h1>Tasks</h1>
                <AddTask />
                <TaskList tasks={this.state.tasks} />
            </div>
        );
    }

    componentDidMount() {
        TaskStore.listen(this.onChange);
        TaskActions.fetchTasks();
    }

    componentWillUnmount() {
        TaskStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }
}
