import React from 'react';
import ReactDom from 'react-dom';
import {BaseComponent} from './BaseComponent';
import TaskActions from '../actions/TaskActions';

/**
 * provides the add task form of the application
 */
export class AddTask extends BaseComponent {
    /**
     * class constructor - initializes the form state
     */
    constructor() {
        super('addTask', 'onChange');
        /**
         * form state
         * @type {Object}
         * @property {string} value - task name input field value
         * @see https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#components-are-just-state-machines
         */
        this.state = {
            value: ''
        };
    }

    /** @private */
    addTask() {
        TaskActions.addTask(this.state.value);
        this.reset();
    }

    /** @private */
    reset() {
        this.setState({
            value: ''
        });
    }

    /**
     * updates the form state with entered task name
     * @param {Event} changeEvent - change event from task name input field
     */
    onChange(changeEvent) {
        this.setState({
            value: changeEvent.target.value
        });
    }

    /**
     * invoked immediately after {@link AddTask#render}
     *
     * stops the form submission from reloading the page
     *
     * @see https://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount
     */
    componentDidMount() {
        let form = document.getElementById('addTaskForm');
        form.addEventListener('submit', submitEvent => {
            submitEvent.preventDefault();
        });
    }

    /**
     * render the component
     * @return {ReactElement} React element to be rendered
     * @see https://facebook.github.io/react/docs/component-specs.html#render
     */
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
