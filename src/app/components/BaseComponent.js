
import React from 'react';
import ReactDom from 'react-dom';

export class BaseComponent extends React.Component {
    constructor(...methods) {
        super();
        methods.forEach(method => this[method] = this.method.bind(this));
    }
}
