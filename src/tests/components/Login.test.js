import React from 'react';
import {shallow} from 'enzyme';
import {Login} from '../../components/Login';

test('should render Login page correctly', () => {
    const wrapper = shallow(<Login startLogin={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin correctly', () => {
    const startLoginSpy = jest.fn();
    const wrapper = shallow(<Login startLogin={startLoginSpy}/>);
    wrapper.find('button').simulate('click');
    expect(startLoginSpy).toHaveBeenCalled();
});