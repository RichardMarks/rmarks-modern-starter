// A Modern Web Development Project Starter with ReactJS
// MIT Licensed
// (C) 2015, Richard Marks <ccpsceo@gmail.com>

import React from 'react';
import ReactDom from 'react-dom';

class BaseComponent extends React.Component {
    constructor(...methods) {
        super();
        methods.forEach(method => this[method] = this.method.bind(this));
    }
}

class Task extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        let { task } = this.props;
        let elements = [];

        if (task.done) {
            elements.push(<del key={task.id}>{task.name}</del>);
        } else {
            elements.push(<strong key={task.id}>{task.name}</strong>);
        }
        return (
            <li>{elements}</li>
        );
    }
}

class App extends BaseComponent {
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

const mockData = [
    { id: 1, name: 'item one', done: true },
    { id: 2, name: 'item two', done: false },
    { id: 3, name: 'item three', done: false }
];

/**
 * provides the entry point of the application
 * called when the DOMContentLoaded event fires.
 */
export function main() {
    // prepare the DOM environment for React
    let reactRootElement = document.createElement('div');
    reactRootElement.id = 'reactRoot';
    document.body.insertBefore(reactRootElement, document.body.firstChild);

    ReactDom.render(<App tasks={mockData}/>, reactRootElement);
}

document.addEventListener('DOMContentLoaded', event => main());
