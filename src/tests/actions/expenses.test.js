import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import {
    startAddExpense,
    addExpense,
    editExpense,
    removeExpense,
    setExpenses,
    startSetExpenses, 
    startRemoveExpense,
    startEditExpense} from '../../actions/expenses';
import expenses from '../fixtures/testExpenses';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = {auth: {uid}}
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {}
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = {description, note, amount, createdAt};
    })
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expenses from firebase', done => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        database.ref(`users/${uid}/expenses/${id}`).once('value').then(snapshot => {
            expect(snapshot.val()).toBe(null);
            done();
        });
    });
});

test('should setup edit expense action', () => {
    const action = editExpense('123abc', {note: 'new note'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'new note'
        }
    });
});

test('should edit expense in firebase', done => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    const updates = {
        description: 'rent for june',
        amount: 60000
    };
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value')
    }).then(snapshot => {
        expect(snapshot.val()).toEqual({
            description: 'rent for june',
            note: '',
            amount: 60000,
            createdAt: moment(0).add(4, 'days').valueOf()
        });
        done();
    });
});

test('should setup add expense action with provided values', () => {
    const action = addExpense(expenses[0]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Bills',
        amount: 40000,
        note: 'gas and water',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should setup set expense action with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch expenses from firebase', done => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

