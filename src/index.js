import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import grey from 'material-ui/colors/grey';

import {
  createStore, 
  applyMiddleware, 
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {
  ConnectedRouter, 
  routerReducer,
  routerMiddleware
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import App from './App';
import './index.css';

// Redux and Routing
import pageReducer from './reducers/page';
import peopleReducer from './reducers/people';
import personReducer from './reducers/person';

const history = createHistory();
const historyMiddleware = routerMiddleware(history);
const createStoreWithMiddleware = applyMiddleware(thunk, historyMiddleware)(createStore);
const store = createStoreWithMiddleware(
  combineReducers({
    page: pageReducer,
    people: peopleReducer,
    person: personReducer,
    routing: routerReducer
  })
);

// Material UI
const theme = createMuiTheme({
  palette: {
    primary: blue,
    accent: grey,
    type: 'light'
  }
});

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker();
