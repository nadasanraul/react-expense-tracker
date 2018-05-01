import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters'
import ExpensesSummary from './ExpensesSummary';

const ExpenseDashboard = () => (
    <div className="container">
        <ExpenseListFilters  />
        <ExpensesSummary />
        <ExpenseList />
    </div>
);

export default ExpenseDashboard;