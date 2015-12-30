
import React from 'react';
import ReactDom from 'react-dom';

/**
 * provides method binding for React Component classes
 */
export class BaseComponent extends React.Component {
    /**
     * class constructor - conveniently binds the "this" of all listed methods
     * for React to play nicely with element event handlers
     * @param {...string[]} methods - names of methods to bind
     */
    constructor(...methods) {
        super();
        methods.forEach(method => this[method] = this[method].bind(this));
    }
}
