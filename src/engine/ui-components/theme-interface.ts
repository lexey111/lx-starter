export type TAppTheme = {
	code: string // theme name, without whitespaces - will be used as part of CSS class like body.theme-%name%
	family: 'dark' | 'light' // to tune some items that aren't directly covered with theme variables
	title: string // to display theme in the interface, like "Solarized Dark cool theme"
};

export const AvailableThemes: ReadonlyArray<TAppTheme> = [
	{
		code: 'default',
		family: 'light',
		title: 'Default theme'
	},
	{
		code: 'light',
		family: 'light',
		title: 'Light theme'
	},
	{
		code: 'dark',
		family: 'dark',
		title: 'Dark theme'
	},
];

export function findTheme(code: string): TAppTheme | undefined {
	return AvailableThemes.find(theme => theme.code === code);
}
