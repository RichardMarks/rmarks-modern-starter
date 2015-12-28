// A Modern Web Development Project Starter with ReactJS
// MIT Licensed
// (C) 2015, Richard Marks <ccpsceo@gmail.com>
import {Stage} from './canvas/Stage';
import view from './views/view';
import stageExample from './examples/stage_example';

/**
 * provides the entry point of the application
 * called when the DOMContentLoaded event fires.
 */
export function main() {
    // prepare the DOM environment for React
    let reactRootElement = document.createElement('div');
    reactRootElement.id = 'reactRoot';
    document.body.insertBefore(reactRootElement, document.body.firstChild);

    // canvas Stage example
    stageExample();

    // fire up the React view
    view(reactRootElement);
}

document.addEventListener('DOMContentLoaded', event => main());
