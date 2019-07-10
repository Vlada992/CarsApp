import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
* importing installed boostrap module with npm from node_module
* This is JS file responsible for rendering/calling our top application component (App) into HTML document, into one div
*/

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
