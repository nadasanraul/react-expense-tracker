import React from 'react';
import {shallow} from 'enzyme';
import {EditPage} from '../../components/EditPage';
import expenses from '../fixtures/testExpenses';

let startEditExpenseSpy, startRemoveExpenseSpy, wrapper, historySpy;

beforeEach(() => {
    startEditExpenseSpy = jest.fn();
    startRemoveExpenseSpy = jest.fn();
    historySpy = {push: jest.fn()}
    wrapper = shallow(<EditPage expense={expenses[0]} startEditExpense={startEditExpenseSpy} startRemoveExpense={startRemoveExpenseSpy} history={historySpy} />)
});

test('should render EditPage corectly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
    const updates = {description: 'more gum'}
    wrapper.find('ExpenseForm').prop('onSubmit')(updates);
    expect(startEditExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id, updates);
    expect(wrapper).toMatchSnapshot();
});

test('should handle removeExpense', () => {
    wrapper.find('button').simulate('click');
    expect(startRemoveExpenseSpy).toHaveBeenLastCalledWith({id: expenses[0].id});
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
});