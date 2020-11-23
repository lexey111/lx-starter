import React, {useLayoutEffect, useRef} from 'react';
import * as Prism from './prism.js';

interface ISyntaxHighlightProps {
	language?: 'tsx' | 'md' | 'ts' | 'js' | 'jsx' | 'less' | 'sass' | 'css' | 'json' | 'html' | 'bash' | 'markup'
	content?: string
	title?: string
	lines?: Array<number> | number // lines to highlight
	children?: any
}

export const SyntaxHighlight = (
	{
		language = 'tsx',
		title = '',
		content = '',
		lines = [],
		children = void 0
	}: ISyntaxHighlightProps): JSX.Element | null => {

	const hlRef = useRef<any>();

	useLayoutEffect(() => {
		// run highlighting with delay
		if (!hlRef.current) {
			return;
		}
		const delay = setTimeout(() => {
			if (!hlRef.current) {
				return;
			}
			Prism.highlightElement(
				(hlRef.current as HTMLPreElement).children[0],
				false,
				() => {
					if (!hlRef.current) {
						return;
					}
					// must not call the re-rendering
					(hlRef.current as HTMLPreElement).className = (hlRef.current as HTMLPreElement).className + ' active';
				}
			);
		}, 200);

		return () => {
			hlRef.current = void 0;
			clearTimeout(delay);
		};
	}, [hlRef]);

	let text = content;

	if (!content && typeof children === 'string') {
		text = children;
	}

	if (!content && typeof children === 'object') {
		language = 'json';
		try {
			text = JSON.stringify(children, null, 2);
		} catch (e) {
			text = 'Invalid JSON';
		}
	}

	if (!text) {
		return null;
	}

	return <div className={'example-hl-container'}>
		{title && <div className={'example-hl-title'}>{title}</div>}
		<pre
			data-line={Array.isArray(lines) ? lines.join(',') : lines}
			className={'hl-component'}
			ref={hlRef}>
<code className={'language-' + language}>{text || 'no content'}</code></pre>
	</div>;
};
