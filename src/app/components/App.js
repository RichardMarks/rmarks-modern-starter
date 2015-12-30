import React from 'react';
import ReactDom from 'react-dom';
import {BaseComponent} from './BaseComponent';
import {TaskList} from './TaskList';
import {AddTask} from './AddTask';
import TaskStore from '../stores/TaskStore';
import TaskActions from '../actions/TaskActions';

/**
 * provides the main application component
 */
export class App extends BaseComponent {
    /**
     * class constructor - initializes the application state
     */
    constructor() {
        super('onChange');
        /**
         * application state {@link TaskStore#state}
         * @type {Object}
         * @see https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#components-are-just-state-machines
         */
        this.state = TaskStore.getState();
    }

    /**
     * render the component
     * @return {ReactElement} React element to be rendered
     * @see https://facebook.github.io/react/docs/component-specs.html#render
     */
    render() {
        if (this.state.errorMessage) {
            return (
                <div>
                    <h1>Tasks</h1>
                    <AddTask />
                    <div className="text-danger">{this.state.errorMessage}</div>
                </div>
            );
        }

        if (this.state.tasks.length === 0) {
            return (
                <div>
                    <h1>Tasks</h1>
                    <AddTask />
                    <span className="fa fa-spinner">Loading...</span>
                </div>
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

    /**
     * invoked immediately after {@link App#render}
     *
     * listens to the {@link TaskStore} for changes, directing them to {@link App#onChange}
     *
     * invokes {@link TaskActions#fetchTasks} to populate the application with data
     *
     * @see https://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount
     */
    componentDidMount() {
        TaskStore.listen(this.onChange);
        TaskActions.fetchTasks();
    }

    /**
     * invoked immediately before component is unmounted from the DOM.
     *
     * stops listening to the {@link TaskStore} for changes
     *
     * @see https://facebook.github.io/react/docs/component-specs.html#unmounting-componentwillunmount
     */
    componentWillUnmount() {
        TaskStore.unlisten(this.onChange);
    }

    /**
     * updates the application state
     * @param {Object} state - new application state
     */
    onChange(state) {
        this.setState(state);
    }
}
