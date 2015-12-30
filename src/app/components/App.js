import React from 'react';
import ReactDom from 'react-dom';

import {BaseComponent} from './BaseComponent';
import {Task} from './Task';

export class App extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        let { tasks } = this.props;
        let taskList = [];
        tasks.forEach(task => taskList.push(<Task key={task.id} task={task} />));
        return (
            <div>
                <h1>Tasks</h1>
                <div>
                    <ul>
                        {taskList}
                    </ul>
                </div>
            </div>
        );
    }
}
