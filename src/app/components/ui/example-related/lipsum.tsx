import {LoremIpsum} from 'lorem-ipsum';
import React, {useMemo} from 'react';

const DEFAULT_WORDS = 40;
const DEFAULT_PARAGRAPHS = 2;

function getLipsumParaRecords(words: number = DEFAULT_WORDS, paragraphs: number = DEFAULT_PARAGRAPHS): Array<string> {
	const generator: { generateParagraphs: (number) => string } = new LoremIpsum({
		sentencesPerParagraph: {
			max: 5,
			min: 2
		},
		wordsPerSentence: {
			max: words,
			min: 5
		}
	});

	const records: Array<string> = [];

	for (let i = 0; i < paragraphs; i++) {
		records.push(generator.generateParagraphs(1));
	}
	return records;
}

export type TLipsumParaProps = {
	paragraphs?: number
	words?: number
};

export const LipsumPara: React.FC<TLipsumParaProps> = (props: TLipsumParaProps) => {
	const data = useMemo(
		() => getLipsumParaRecords(props.words, props.paragraphs),
		[props.words, props.paragraphs]
	);

	return <div>
		{data.map((paragraph, idx) => {
			let text = paragraph;
			if (!text.endsWith('.')) {
				text += '. ';
			}
			return <p key={idx}>{text}</p>;
		})}
	</div>;
};
