/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter, Router, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from './helpers';
import { clear } from './actions';
import { PrivateRoute } from './components';
import { RosterPage, PlayerPage, LoginPage, RegisterPage } from './pages';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

// const SnackBarAlert = (props: JSX.IntrinsicAttributes & AlertProps) => {
//   return <MuiAlert elevation={6} variant="standard" {...props} />;
// };

const App = (props: { dispatch?: any; alert?: any }) => {
  const [open, setOpen] = useState(false);
  const { dispatch } = props;
  const { alert } = props;
  // history.listen(() => {
  //   // clear alert on location change
  //   dispatch(clear());
  // });

  return (
    <BrowserRouter>
      <Router history={history}>
        <Route path="/*" component={RosterPage} />
      </Router>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: { alert: any }) => {
  const { alert } = state;
  return {
    alert
  };
};

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
