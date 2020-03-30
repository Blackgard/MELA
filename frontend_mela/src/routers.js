import React, { Component } from 'react';

import {
  Route, Switch, Redirect, withRouter
} from "react-router-dom";

import Welcome from './components/Welcome';
import NotFound from './components/NotFound';

import TableAidsView from './views/TableAidsView';
import LoginFormView from './views/LoginFormView';

class SwitchRouter extends Component {
    render() {
        const { history } = this.props;
        return (
            <React.Fragment>
                <Switch>
                    <Route history={history} path='/login' component={LoginFormView} />
                    <Route history={history} path='/eop' component={TableAidsView} />
                    <Route history={history} path='/home' component={Welcome} />
                    <Route history={history} path='/notfound' component={NotFound}/>
                    { this.props.isAuth? 
                        <Redirect to='/home'/>
                        :
                        <Redirect to='/login'/>
                    }
                </Switch>
            </React.Fragment>
        );
    }
}

export default withRouter(SwitchRouter)