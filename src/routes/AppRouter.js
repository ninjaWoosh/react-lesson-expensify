import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Dashboard from "../components/Dashboard";
import LoginPage from "../components/Login";
import CreateExpenses from "../components/CreateExpenses";
import EditExpenses from "../components/EditExpenses";
import NotFoundPage from "../components/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/create" component={CreateExpenses}/>
                <PrivateRoute path="/update/:id" component={EditExpenses}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;