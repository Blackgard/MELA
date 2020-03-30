import React from 'react';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import SwitchRouter from './routers';
import Layout from './components/layout';

import { connect } from 'react-redux';

const history = createBrowserHistory();

function App(props) {
  return (
    <Router history={history}>
      <Layout {...props} history={history}>
        <SwitchRouter isAuth={props.isAuth}/>
      </Layout>
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    isAuth  : (
      state.auth.token !== null               ||
      localStorage.getItem('token') !== null)
  }
}

export default connect(mapStateToProps)(App);
