import React from 'react';
import ReactDom from 'react-dom';
import {App} from './components/App';

export default reactRootElement => {
    ReactDom.render(<App />, reactRootElement);
};
