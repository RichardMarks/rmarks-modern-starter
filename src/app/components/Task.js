import React from 'react';
import ReactDom from 'react-dom';

import {BaseComponent} from './BaseComponent';

export class Task extends BaseComponent {
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
