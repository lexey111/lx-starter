/**
 * @jest-environment jsdom
 */
import {mount} from 'enzyme';
import React from 'react';

import {getRadioValue, Radio, RadioGroup} from '../radio-group-component';

describe('Radio group', () => {
	describe('Radio', () => {
		test('Should nor render anything', () => {
			const container = mount(<Radio value={'A'}>Line 1</Radio>);

			const items = container?.children();
			expect(container.isEmptyRender()).toBe(true);
			expect(items?.length).toBe(0);
		});
	});

	describe('getRadioValue', () => {
		test('Should return undefined on null input', () => {
			const result = getRadioValue(null as any);
			expect(result).toBe(undefined);
		});

		test('Should return undefined on null target', () => {
			const result = getRadioValue({target: null} as any);
			expect(result).toBe(undefined);
		});

		test('Should return undefined on null target dataset', () => {
			const result = getRadioValue({target: {dataset: null}} as any);
			expect(result).toBe(undefined);
		});

		test('Should return undefined on absent target dataset value', () => {
			const result = getRadioValue({target: {dataset: {}}} as any);
			expect(result).toBe(undefined);
		});

		test('Should return valid target dataset value', () => {
			const result = getRadioValue({target: {dataset: {value: 'AAAA'}}} as any);
			expect(result).toBe('AAAA');
		});

		test('Should return undefined on null currentTarget', () => {
			const result = getRadioValue({currentTarget: null} as any);
			expect(result).toBe(undefined);
		});

		test('Should return undefined on null currentTarget dataset', () => {
			const result = getRadioValue({currentTarget: {dataset: null}} as any);
			expect(result).toBe(undefined);
		});

		test('Should return undefined on absent currentTarget dataset value', () => {
			const result = getRadioValue({currentTarget: {dataset: {}}} as any);
			expect(result).toBe(undefined);
		});

		test('Should return valid currentTarget dataset value', () => {
			const result = getRadioValue({currentTarget: {dataset: {value: 'AAAA'}}} as any);
			expect(result).toBe('AAAA');
		});
	});

	test('Rendering items', () => {
		const container = mount(<RadioGroup>
			<Radio value={'A'}>Line 1</Radio>
			<Radio value={'B'}>Line 2</Radio>
		</RadioGroup>);

		const items = container?.find('.radiogroup-item');

		expect(items?.length).toBe(2);
		expect(container.contains('Line 2')).toBeTruthy();
		expect(container.contains('Line 1')).toBeTruthy();

		const element = container?.find('.radiogroup-item[data-value="A"]');
		expect(element.text()).toBe('Line 1');
	});

	test('Not rendering if there no items', () => {
		const container = mount(<RadioGroup></RadioGroup>);

		const items = container?.find('.radiogroup-item');

		expect(items?.length).toBe(0);
	});

	test('Not rendering if there no items with values', () => {
		const container = mount(<RadioGroup>
			<Radio value={void 0}>Line 1</Radio>
			<Radio value={void 0}>Line 2</Radio>
		</RadioGroup>);

		const items = container?.find('.radiogroup-item');

		expect(items?.length).toBe(0);
	});

	test('Rendering only items with values', () => {
		const container = mount(<RadioGroup>
			<Radio value={void 0}>Line 1</Radio>
			<Radio value={0}>Line 2</Radio>
			<Radio value={void 0}>Line 3</Radio>
		</RadioGroup>);

		const items = container?.find('.radiogroup-item');

		expect(items?.length).toBe(1);
		expect(container.contains('Line 2')).toBeTruthy();
	});

	test('Assigning inline prop', () => {
		const container = mount(<RadioGroup inline={true}>
			<Radio value={'A'}>Line 1</Radio>
			<Radio value={'B'}>Line 2</Radio>
		</RadioGroup>);

		let element = container?.find('.radiogroup-container');
		expect(element.hasClass('inline')).toBe(true);

		container.setProps({inline: false});
		element = container?.find('.radiogroup-container');

		expect(element.hasClass('inline')).toBe(false);
	});

	test('Assigning reversed prop', () => {
		const container = mount(<RadioGroup reversed={true}>
			<Radio value={'A'}>Line 1</Radio>
			<Radio value={'B'}>Line 2</Radio>
		</RadioGroup>);

		let element = container?.find('.radiogroup-container');
		expect(element.hasClass('reversed')).toBe(true);

		container.setProps({reversed: false});
		element = container?.find('.radiogroup-container');

		expect(element.hasClass('reversed')).toBe(false);
	});

	test('Assigning disabled to item', () => {
		const container = mount(<RadioGroup>
			<Radio value={'A'} disabled={true}>Line 1</Radio>
			<Radio value={'B'}>Line 2</Radio>
		</RadioGroup>);

		const element = container?.find('.radiogroup-item[data-value="A"]');
		expect(element.hasClass('disabled')).toBe(true);
	});

	test('Set item checked by value', () => {
		const container = mount(<RadioGroup value={'B'}>
			<Radio value={'A'}>Line 1</Radio>
			<Radio value={'B'}>Line 2</Radio>
		</RadioGroup>);

		const elementA = container?.find('.radiogroup-item[data-value="A"]');
		expect(elementA.hasClass('checked')).toBe(false);

		const elementB = container?.find('.radiogroup-item[data-value="B"]');
		expect(elementB.hasClass('checked')).toBe(true);
	});

	test('Change item checked by value', () => {
		const container = mount(<RadioGroup value={'B'}>
			<Radio value={'A'}>Line 1</Radio>
			<Radio value={'B'}>Line 2</Radio>
		</RadioGroup>);

		let elementA = container?.find('.radiogroup-item[data-value="A"]');
		expect(elementA.hasClass('checked')).toBe(false);

		let elementB = container?.find('.radiogroup-item[data-value="B"]');
		expect(elementB.hasClass('checked')).toBe(true);

		container.setProps({value: 'A'});
		elementA = container?.find('.radiogroup-item[data-value="A"]');
		expect(elementA.hasClass('checked')).toBe(true);

		elementB = container?.find('.radiogroup-item[data-value="B"]');
		expect(elementB.hasClass('checked')).toBe(false);
	});

	test('Change item checked by mouse click', () => {
		let value = 'B';
		let callCount = 0;
		const setValue = (x: string): void => {
			value = x;
			callCount++;
		};

		// eslint-disable-next-line react/jsx-no-bind
		const container = mount(<RadioGroup value={value} onChange={setValue}>
			<Radio value={'A'}>Line 1</Radio>
			<Radio value={'B'}>Line 2</Radio>
		</RadioGroup>);

		let elementA = container?.find('.radiogroup-item[data-value="A"]');
		expect(elementA.hasClass('checked')).toBe(false);

		let elementB = container?.find('.radiogroup-item[data-value="B"]');
		expect(elementB.hasClass('checked')).toBe(true);

		elementA.simulate('click');

		expect(callCount).toBe(1);
		expect(value).toBe('A');

		container.setProps({value});
		elementA = container?.find('.radiogroup-item[data-value="A"]');
		expect(elementA.hasClass('checked')).toBe(true);

		elementB = container?.find('.radiogroup-item[data-value="B"]');
		expect(elementB.hasClass('checked')).toBe(false);

		elementB.simulate('click');

		expect(callCount).toBe(2);
		expect(value).toBe('B');
	});

	test('Change item checked by keyboard Enter key', () => {
		let value = 'B';
		let callCount = 0;
		const setValue = (x: string): void => {
			value = x;
			callCount++;
		};

		// eslint-disable-next-line react/jsx-no-bind
		const container = mount(<RadioGroup value={value} onChange={setValue}>
			<Radio value={'A'}>Line 1</Radio>
			<Radio value={'B'}>Line 2</Radio>
		</RadioGroup>);

		let elementA = container?.find('.radiogroup-item[data-value="A"]');
		expect(elementA.hasClass('checked')).toBe(false);

		let elementB = container?.find('.radiogroup-item[data-value="B"]');
		expect(elementB.hasClass('checked')).toBe(true);

		elementA.simulate('keydown', {key: 'Enter'});

		expect(callCount).toBe(1);
		expect(value).toBe('A');

		container.setProps({value});
		elementA = container?.find('.radiogroup-item[data-value="A"]');
		expect(elementA.hasClass('checked')).toBe(true);

		elementB = container?.find('.radiogroup-item[data-value="B"]');
		expect(elementB.hasClass('checked')).toBe(false);

		elementB.simulate('keydown', {key: 'Enter'});

		expect(callCount).toBe(2);
		expect(value).toBe('B');

		elementB.simulate('keydown', {key: ' '});

		expect(callCount).toBe(3);
		expect(value).toBe('B');
	});

	test('Dont change item checked by keyboard non-Enter key', () => {
		let value = 'B';
		let callCount = 0;
		const setValue = (x: string): void => {
			value = x;
			callCount++;
		};

		// eslint-disable-next-line react/jsx-no-bind
		const container = mount(<RadioGroup value={value} onChange={setValue}>
			<Radio value={'A'}>Line 1</Radio>
			<Radio value={'B'}>Line 2</Radio>
		</RadioGroup>);

		let elementA = container?.find('.radiogroup-item[data-value="A"]');
		expect(elementA.hasClass('checked')).toBe(false);

		let elementB = container?.find('.radiogroup-item[data-value="B"]');
		expect(elementB.hasClass('checked')).toBe(true);

		elementA.simulate('keydown', {key: 'A'});

		expect(callCount).toBe(0);
		expect(value).toBe('B');

		container.setProps({value});
		elementA = container?.find('.radiogroup-item[data-value="A"]');
		expect(elementA.hasClass('checked')).toBe(false);

		elementB = container?.find('.radiogroup-item[data-value="B"]');
		expect(elementB.hasClass('checked')).toBe(true);
	});
});
