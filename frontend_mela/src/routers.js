import React, { Component } from 'react';

import {
  Route, Switch, Redirect, withRouter
} from "react-router-dom";

import Welcome from './components/Welcome';
import NotFound from './components/NotFound';



import LoginFormView from './views/LoginFormView';
import SignupFormView from './views/SignupFormView';

import CustomersView from './views/CustomersView';

import TableApplicationsView from './views/TableApplicationsView';
import TableEmployersView from './views/TableEmployersView';
import TableAidsView from './views/TableAidsView';
import CardStoragesView from './views/CardStoragesView';

import EmployerDetailsView from './views/EmployerDetailsView';
import AidDetailsView from './views/AidDetailsView';

import CompanyProfileView from './views/CompanyProfileView';
import ReportingView from './views/ReportingView';

class SwitchRouter extends Component {
    render() {
        const { history, isAuth, is_staff } = this.props;
        return (
            <React.Fragment>
                {isAuth && is_staff ?
                    <Switch>
                        <Route history={history} exact path='/eops' component={TableAidsView} />
                        <Route history={history} path='/eops/:id' component={AidDetailsView} />

                        <Route history={history} exact path='/employers' component={TableEmployersView} />
                        <Route history={history} path='/employers/:id' component={EmployerDetailsView} />

                        <Route history={history} exact path='/storages' component={CardStoragesView} />

                        <Route history={history} exact path='/customers' component={CustomersView} />
                        <Route history={history} path='/customers/:id' render={(obj) => <CompanyProfileView {...this.props} match={obj.match}/>} />

                        <Route history={history} exact path='/applications' component={TableApplicationsView} />
                        <Route history={history} exact path='/' component={TableApplicationsView} />

                        <Route history={history} path='/reporting' component={ReportingView} />

                        <Route history={history} path='/signup' component={SignupFormView} />
                        <Route history={history} path='/login' component={LoginFormView} />
                        <Route history={history} path='/notfound' component={NotFound}/>
                        <Redirect to='/notfound'/>
                    </Switch>
                    :
                    <Switch>

                        <Route history={history} path='/eops/:id' component={AidDetailsView} />
                        <Route history={history} path='/profile' render={() => <CompanyProfileView {...this.props}/>} />
                        <Route history={history} path='/home' render={() => <Welcome {...this.props}/>} />
                        <Route history={history} exact path='/' render={() => <Welcome {...this.props}/>} />
                        <Route history={history} path='/signup' render={() => <SignupFormView {...this.props}/>} />
                        <Route history={history} path='/login' render={() => <LoginFormView {...this.props}/>} />
                        <Route history={history} path='/notfound' render={() => <NotFound {...this.props}/>} />
                        <Redirect to='/notfound'/>
                    </Switch>
                }
            </React.Fragment>
        );
    }
}

export default withRouter(SwitchRouter)