import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import selectTotalExpenses from '../../selectors/expenses-total';
import expenses from '../fixtures/testExpenses';

let expense, wrapper;

beforeEach(() => {
    expense = [expenses[1]];
    wrapper = shallow(<ExpensesSummary expensesCount={expenses.length} expensesTotal={selectTotalExpenses(expenses)}/>)
});

test('should render ExpensesSummary correctly with 1 item', () => {
    wrapper.setProps({
        expensesCount: expense.length,
        expensesTotal: selectTotalExpenses(expense)
    });
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary correctly with multiple or 0 items', () => {
    expect(wrapper).toMatchSnapshot();
});