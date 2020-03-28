import React, { Component } from 'react';

import {
  Route, Switch, Redirect, withRouter
} from "react-router-dom";

import Welcome from './components/Welcome';
import TableAidsView from './views/TableAidsView';
import NotFound from './components/NotFound';

class SwitchRouter extends Component {
    render() {
        const { history } = this.props

        return (
            <React.Fragment>
                <Switch>
                    <Route history={history} path='/eop' component={TableAidsView} />
                    <Route history={history} path='/home' component={Welcome} />
                    <Route history={history} path='/notfound' component={NotFound}/>

                    <Redirect from='/' to='/home' />
                </Switch>
            </React.Fragment>
        );
    }
}

export default withRouter(SwitchRouter)