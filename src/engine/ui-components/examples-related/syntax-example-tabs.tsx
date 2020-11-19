import React from 'react';
import {TabPane, Tabs} from '../display/tabs/tabs-component';
import {SyntaxHighlight} from './syntax-highlight';

type CSyntaxExampleProps = {
	markup?: any
	code?: any
	data?: any
	syntax?: any
	styles?: any
	result?: any
	activePage?: 'markup' | 'styles' | 'code' | 'data' | 'result' | 'syntax'
};

export const SyntaxExampleTabs = ({markup, code, data, syntax, styles, result, activePage}: CSyntaxExampleProps): JSX.Element => {
	let activeKey = '1';
	if (activePage === 'markup') {
		activeKey = '1';
	}
	if (activePage === 'styles') {
		activeKey = '2';
	}
	if (activePage === 'code') {
		activeKey = '3';
	}
	if (activePage === 'data') {
		activeKey = '4';
	}
	if (activePage === 'syntax') {
		activeKey = '5';
	}
	if (activePage === 'result') {
		activeKey = '6';
	}
	const availablePages: Array<string> = [];
	if (markup) {
		availablePages.push('1');
	}
	if (styles) {
		availablePages.push('2');
	}
	if (code) {
		availablePages.push('3');
	}
	if (data) {
		availablePages.push('4');
	}
	if (syntax) {
		availablePages.push('5');
	}
	if (result) {
		availablePages.push('6');
	}
	if (availablePages.indexOf(activeKey) === -1) {
		activeKey = availablePages.length > 0 ? availablePages[0] : '1';
	}
	return <div className={'syntax-example-tabs'}>
		<Tabs activeId={activeKey}>
			{markup && <TabPane title={'Markup'} id={'1'} noPaddings={true}>
				<SyntaxHighlight language={'tsx'} content={markup as string}/>
			</TabPane>}

			{styles && <TabPane title={'Style'} id={'2'} noPaddings={true}>
				<SyntaxHighlight language={'less'} content={styles as string}/>
			</TabPane>}

			{code && <TabPane title={'Code'} id={'3'} noPaddings={true}>
				<SyntaxHighlight language={'tsx'} content={code as string}/>
			</TabPane>}

			{data && <TabPane title={'Data'} id={'4'} noPaddings={true}>
				<SyntaxHighlight language={'json'} content={JSON.stringify(data, null, 2)}/>
			</TabPane>}

			{syntax && <TabPane title={'Syntax'} id={'5'} noPaddings={true}>
				<SyntaxHighlight language={'tsx'} content={syntax as string}/>
			</TabPane>}

			{result && <TabPane title={'Preview'} id={'6'}>{result}</TabPane>}
		</Tabs>
	</div>;
};
