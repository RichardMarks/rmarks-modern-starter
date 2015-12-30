import React from 'react';
import ReactDom from 'react-dom';
import {App} from './components/App';

/**
 * renders the application to the React DOM
 * @param {HTMLDivElement} reactRootElement - document element to render the application into
 */
export default function renderApp(reactRootElement) {
    ReactDom.render(<App />, reactRootElement);
};
