//Reducer default state
const expensesReducerDefaultState = []

// Reducer function
export default (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [...state, action.payload.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.payload.id);
        case 'EDIT_EXPENSE':
            return state.map(expense => expense.id === action.payload.id ? {...expense, ...action.payload.updates} : expense); 
        case 'SET_EXPENSES':
            return action.payload.expenses
        default:
            return state;
    }
};
