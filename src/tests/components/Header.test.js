import React from 'react';
import {shallow} from 'enzyme';
import Header from '../../components/Header';

test('should render Header correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
    
    // expect(wrapper.find('.navbar-brand').text()).toBe('Expenses Tracker');
    // const renderer = new ReactShallowRender();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
});