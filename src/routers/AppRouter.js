import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AddExpense from '../components/AddExpense';
import EditPage from '../components/EditPage';
import ExpenseDashboard from '../components/ExpenseDashboard';
import Header from '../components/Header';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={ExpenseDashboard} exact={true}/>
                <Route path="/create" component={AddExpense} />
                <Route path="/edit/:id" component={EditPage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
