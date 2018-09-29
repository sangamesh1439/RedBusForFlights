/*************************************************
 * Code Challange
 *************************************************/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store/createStore';
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
