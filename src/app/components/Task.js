import React from 'react';
import ReactDom from 'react-dom';
import {BaseComponent} from './BaseComponent';
import TaskActions from '../actions/TaskActions';

export class Task extends BaseComponent {
    constructor() {
        super('removeTask', 'completeTask');
    }

    render() {
        let { task } = this.props;

        if (task.done) {
            return (
                <li className="list-group-item text-muted h2">
                <div>
                    <del>{task.name}</del>&nbsp;
                    <div className="pull-right btn btn-danger btn-xs" onClick={this.removeTask}>
                        <button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        Remove Task
                    </div>
                    <div className="clearfix"></div>
                </div>
                </li>
            );
        } else {
            return (
                <li className="list-group-item text-info h2">
                    {task.name}
                    <div className="pull-left btn btn-primary" onClick={this.completeTask}>
                        <span className="fa fa-check"></span>
                        Complete Task
                    </div>
                    <div className="clearfix"></div>
                </li>
            );
        }
    }

    completeTask() {
        TaskActions.completeTask(this.props.task.id);
    }

    removeTask() {
        TaskActions.removeTask(this.props.task.id);
    }
}
