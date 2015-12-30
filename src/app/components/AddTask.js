import React from 'react';
import ReactDom from 'react-dom';
import {BaseComponent} from './BaseComponent';
import TaskActions from '../actions/TaskActions';

export class AddTask extends BaseComponent {
    constructor() {
        super('addTask', 'onChange');
        this.state = {
            value: ''
        };
    }

    addTask() {
        TaskActions.addTask(this.state.value);
        this.reset();
    }

    reset() {
        this.setState({
            value: ''
        });
    }

    onChange(changeEvent) {
        this.setState({
            value: changeEvent.target.value
        });
    }

    componentDidMount() {
        let form = document.getElementById('addTaskForm');
        form.addEventListener('submit', submitEvent => {
            submitEvent.preventDefault();
        });
    }

    render() {
        return (
            <form id="addTaskForm">
                <div className="input-group input-group-lg">
                    <input className="form-control" placeholder="Task name..." type="text" value={this.state.value} onChange={this.onChange} />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="submit" onClick={this.addTask}>Add Task</button>
                    </span>
                </div>
                <div className="h1"></div>
            </form>
        );
    }
}
