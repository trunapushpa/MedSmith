import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/bootstrap.css';
import AppContainer from './containers/app-container';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'
import {Notifs} from 'redux-notifications';
import './css/notif.css';

const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <div>
            <BrowserRouter>
                <AppContainer/>
            </BrowserRouter>
            <Notifs/>
        </div>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
