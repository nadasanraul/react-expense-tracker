import authReducer from '../../reducers/auth';

test('should set uid', () => {
    const action = {
        type: 'LOGIN',
        uid: '123'
    };
    const state = authReducer(undefined, action);
    expect(state).toEqual({uid: '123'});
});

test('should clear uid', () => {
    const defaultState = {uid: '123'};
    const action = {type: 'LOGOUT'};
    const state = authReducer(defaultState, action);
    expect(state).toEqual({});
}); 