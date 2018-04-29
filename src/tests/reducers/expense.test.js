import expensesReducer from '../../reducers/expenses';

const defaultState = [
    {
        id: '1',
        description: 'gum',
        note: '',
        amount: 195,
        createdAt: 0
    }
];

test('should init with empty array', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should add new expense', () => {
    const expense = {
        id: '2',
        description: 'rent',
        note: '',
        amount: 10095,
        createdAt: 1000
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(defaultState, action);
    expect(state).toEqual([...defaultState, expense]);
});

test('should remove expense', () => {
    const id = defaultState[0].id;
    const action = {
        type: 'REMOVE_EXPENSE',
        id
    };
    const state = expensesReducer(defaultState, action);
    expect(state).toEqual([]);
});

test('should not remove expense if id not found', () => {
    const id = '4';
    const action = {
        type: 'REMOVE_EXPENSE',
        id
    };
    const state = expensesReducer(defaultState, action);
    expect(state).toEqual([
        {
            id: '1',
            description: 'gum',
            note: '',
            amount: 195,
            createdAt: 0
        }
    ]);
});

test('should edit an expense', () => {
    const id = defaultState[0].id;
    const updates = {description: 'more gum', amount: 350};
    const action = {
        type: 'EDIT_EXPENSE',
        id,
        updates
    };
    const state = expensesReducer(defaultState, action);
    expect(state).toEqual([
        {
            id: '1',
            description: 'more gum',
            note: '',
            amount: 350,
            createdAt: 0
        }
    ]);
});

test('should not edit expense if expense not found', () => {
    const updates = {description: 'more gum', amount: 350};
    const action = {
        type: 'EDIT_EXPENSE',
        id: 3,
        updates
    };
    const state = expensesReducer(defaultState, action);
    expect(state).toEqual([
        {
            id: '1',
            description: 'gum',
            note: '',
            amount: 195,
            createdAt: 0
        }
    ]);
});