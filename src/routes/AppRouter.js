import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import CreateExpenses from "../components/CreateExpenses";
import EditExpenses from "../components/EditExpenses";
import Help from "../components/Help";
import NotFoundPage from "../components/NotFoundPage";

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={Dashboard} exact={true}/>
                <Route path="/create" component={CreateExpenses}/>
                <Route path="/update/:id" component={EditExpenses}/>
                <Route path="/help" component={Help}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;