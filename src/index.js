import React from 'react';
import registerServiceWorker from './registerServiceWorker';

import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import grey from 'material-ui/colors/grey';

import App from './App';
import reducer from './reducer';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    accent: grey,
    type: 'light'
  }
});

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App/>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker();
