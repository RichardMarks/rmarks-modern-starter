
import React from 'react';
import ReactDom from 'react-dom';

import {App} from './components/App';

const mockData = [
    { id: 1, name: 'item one', done: true },
    { id: 2, name: 'item two', done: false },
    { id: 3, name: 'item three', done: false }
];

export default reactRootElement => {
    ReactDom.render(<App tasks={mockData}/>, reactRootElement);
};
