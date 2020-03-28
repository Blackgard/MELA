import React from 'react';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import SwitchRouter from './routers';
import Layout from './components/layout';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Layout history={history}>
        <SwitchRouter/>
      </Layout>
    </Router>
  );
}

export default App;
