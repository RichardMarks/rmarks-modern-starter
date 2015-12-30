import React from 'react';
import ReactDom from 'react-dom';
import {BaseComponent} from './BaseComponent';
import {Task} from './Task';

/**
 * provides the task list component of the application
 */
export class TaskList extends BaseComponent {
    /**
     * class constructor
     */
    constructor() {
        super();
    }

    /**
     * render the component
     * @return {ReactElement} React element to be rendered
     * @see https://facebook.github.io/react/docs/component-specs.html#render
     */
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
