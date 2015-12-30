import React from 'react';
import ReactDom from 'react-dom';
import {BaseComponent} from './BaseComponent';
import {Task} from './Task';

export class TaskList extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <ul className="list-unstyled list-group">
                {this.props.tasks.map(task => {
                    return (
                        <Task key={task.id} task={task} />
                    );
                })}
            </ul>
        );
    }
}
