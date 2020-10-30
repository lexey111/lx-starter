import {shallow} from 'enzyme';
import React from 'react';

describe('Test React components with Enzyme', () => {
	test('Hello world', () => {
		const wrapper = shallow(<p>Hello Jest!</p>);
		expect(wrapper.text()).toMatch('Hello Jest!');
	});
});
