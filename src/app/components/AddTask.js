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

    render() {
        return (
            <div className="form-group">
                <input className="form-control" placeholder="Task name..." type="text" value={this.state.value} onChange={this.onChange} />
                <button className="btn btn-default pull-right" type="button" onClick={this.addTask}>Add Task</button>
            </div>
        );
    }
}
