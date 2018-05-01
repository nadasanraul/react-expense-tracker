import selectTotalExpenses from '../../selectors/expenses-total';
import expenses from '../fixtures/testExpenses';

test('should return 0 if no data is provided', () => {
    const result = selectTotalExpenses();
    expect(result).toBe(0);
});

test('should add correctly one expense', () => {
    const result = selectTotalExpenses([expenses[1]]);
    expect(result).toBe(expenses[1].amount);
});

test('should add correctly multiple expenses', () => {
    const result = selectTotalExpenses(expenses);
    expect(result).toBe(expenses[0].amount + expenses[1].amount + expenses[2].amount);
});