import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './helpers';
import { createMuiTheme } from '@material-ui/core';
import * as serviceWorker from './serviceWorker';
// Importing the fetch polyfill allows cypress to intercept fetch api requests.
import 'whatwg-fetch';
import { ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Nunito", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root') as HTMLElement
);

//serviceWorker.unregister();

// Hot Module Replacement
// if (module.hot) {
//   module.hot.accept();
// }
